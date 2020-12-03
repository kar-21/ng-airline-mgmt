import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UpdatePassangerDetailsFromKey } from 'src/app/core/store/actions/passanger.action';
import { AppState } from 'src/app/core/store/states/app.state';
import { SharedContants } from 'src/app/shared/shared.constant';

@Component({
  selector: "app-passanger-checkin-details",
  templateUrl: "./passanger-checkin-details.component.html",
  styleUrls: ["./passanger-checkin-details.component.scss"],
})
export class PassangerCheckinDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerCheckinDetailsComponent>,
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
  checkinServices: string[];
  flightNumber: string;
  form: FormGroup;
  checkinServicesForm: FormGroup;
  passangersArray;
  rowSeatName = SharedContants.rowSeatName;
  showSeatOccupied = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
      this.checkinServices = Object.assign([], this.data.checkinServices);
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
    this.closeDialog();
  }

  sendCheckInDataToServer() {
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { checkedIn: !this.checkedIn },
      })
    );
    this.closeDialog();
  }

  addCheckinService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeCheckinService(checkinService: string): void {
    const index = this.checkinServices.indexOf(checkinService);
    if (index >= 0) {
      this.checkinServices.splice(index, 1);
    }
  }

  saveServies() {
    console.log(">>>services", this.checkinServices);
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { checkinServices: this.checkinServices },
      })
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}