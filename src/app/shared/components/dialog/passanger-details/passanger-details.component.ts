import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { UpdatePassangerDetailsFromKey } from "src/app/core/store/actions/passanger.action";
import { AppState } from "src/app/core/store/states/app.state";
import { SharedContants } from "src/app/shared/shared.constant";

@Component({
  selector: "app-passanger-details",
  templateUrl: "./passanger-details.component.html",
  styleUrls: ["./passanger-details.component.scss"],
})
export class PassangerDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerDetailsComponent>,
    private store: Store<AppState>
  ) {}

  name: string;
  seatNumber: string;
  address: string;
  passportNumber: string;
  contactNumber: number;
  checkedIn: boolean;
  wheelChair: boolean;
  infants: boolean;
  ancillaryServices: boolean;
  flightNumber: string;
  form: FormGroup;
  passangersArray;
  rowSeatName = SharedContants.rowSeatName;
  showSeatOccupied = false;

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      this.seatNumber = this.data.seatNumber;
      this.address = this.data.address;
      this.passportNumber = this.data.passportNumber;
      this.contactNumber = this.data.contactNumber;
      this.checkedIn = this.data.checkedIn;
      this.wheelChair = this.data.wheelChair;
      this.infants = this.data.infants;
      this.ancillaryServices = this.data.ancillaryServices;
      this.flightNumber = this.data.flightNumber;
      this.passangersArray = this.data.airlinePassangers;
      this.form = new FormGroup({
        seatNumberForm: new FormControl(this.seatNumber, [
          Validators.required,
          Validators.pattern("^[A-F][1-9]$|^[A-F]1[0-9]$|^[A-F]2[0-5]$"),
        ]),
      });
    }

    this.form.get("seatNumberForm").valueChanges.subscribe((value) => {
      if (value && value !== this.seatNumber && value.length > 1) {
        const row = this.rowSeatName.indexOf(value.slice(0, 1));
        const column = +value.slice(1, value.length) - 1;
        if (
          row > -1 &&
          column > -1 &&
          this.passangersArray[row][column][0] !== null
        ) {
          this.showSeatOccupied = true;
        } else {
          this.showSeatOccupied = false;
        }
      } else {
        this.showSeatOccupied = false;
      }
    });
  }

  changeSeatnumber() {
    const newSeatNumber = this.form.get("seatNumberForm").value;
    if (this.showSeatOccupied) {
      const row = this.rowSeatName.indexOf(newSeatNumber.slice(0, 1));
      const column = +newSeatNumber.slice(1, newSeatNumber.length) - 1;
      const passangerForSeatExchange = this.passangersArray[row][column][0];
      this.store.dispatch(
        new UpdatePassangerDetailsFromKey({
          passangerPassportNumber: passangerForSeatExchange.passportNumber,
          flightNumber: passangerForSeatExchange.flightNumber,
          keyValuePair: { seatNumber: this.seatNumber },
        })
      );
    }
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { seatNumber: newSeatNumber },
      })
    );
    this.dialogRef.close();
  }

  sendCheckInDataToServer() {
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { checkedIn: !this.checkedIn },
      })
    );
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
