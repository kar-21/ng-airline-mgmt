import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { selectorPassangerListOfFlight } from "src/app/core/store/selector/passanger.selector";
import { AppState } from "src/app/core/store/states/app.state";
import { PassangerList } from "../../models/passanger-list.model";
import { SharedContants } from "../../shared.constant";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  styleUrls: ["./seats.component.scss"],
})
export class SeatsComponent implements OnInit {
  @Input() flightNumber: string;
  rowSeatName = ["A", "B", "C", "D", "E", "F"];
  passangers: PassangerList[];
  isLoadingShown = true;
  checkedInText = SharedContants.text.checkedIn;
  notCheckedInText = SharedContants.text.notCheckedIn;
  wheelChairText = SharedContants.text.wheelChair;
  infantsText = SharedContants.text.infants;
  seatsArray = new Array(6)
    .fill(null)
    .map((row) => (row = new Array(25).fill([null])));
  columnSeatNumbrer = new Array(26)
    .fill(null)
    .map((column, index) => (column = index));

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectorPassangerListOfFlight))
      .subscribe((passangers) => {
        if (passangers && passangers[this.flightNumber]) {
          this.passangers = passangers[this.flightNumber];
          this.updateSeatsArray();
          this.isLoadingShown = false;
        }
      });
  }

  updateSeatsArray() {
    this.passangers.forEach((passanger: PassangerList) => {
      const row = this.rowSeatName.indexOf(passanger.seatNumber.slice(0, 1));
      const column =
        +passanger.seatNumber.slice(1, passanger.seatNumber.length) - 1;
      this.seatsArray[row][column] = [
        passanger,
        passanger.checkedIn
          ? SharedContants.text.checkedIn
          : SharedContants.text.notCheckedIn,
        passanger.wheelChair
          ? SharedContants.text.wheelChair
          : SharedContants.text.noWheelChair,
        passanger.infants
          ? SharedContants.text.infants
          : SharedContants.text.noInfants,
      ];
    });
  }

  selectSeat(seat) {
    console.log(">>selected", seat);
    if (seat[0] !== null) {
      const dialogRef = this.dialog.open(DialogComponent, { data: seat[0] });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(">>closed");
      });
    }
  }
}
