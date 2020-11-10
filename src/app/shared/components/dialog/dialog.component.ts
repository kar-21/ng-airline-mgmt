import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { UpdatePassangerDetailsFromKey } from "src/app/core/store/actions/passanger.action";
import { AppState } from "src/app/core/store/states/app.state";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
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
    }
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
