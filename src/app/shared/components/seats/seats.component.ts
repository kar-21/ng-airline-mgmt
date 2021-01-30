import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { selectorPassangerListOfFlight } from "src/app/core/store/selector/passanger.selector";
import { AppState } from "src/app/core/store/states/app.state";
import { PassangerList } from "../../models/passanger-list.model";
import { SharedContants } from "../../shared.constant";
import { PassangerCheckinDetailsComponent } from "../dialog/passanger-checkin-details/passanger-checkin-details.component";
import { PassangerInflightDetailsComponent } from "../dialog/passanger-inflight-details/passanger-inflight-details.component";

@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  styleUrls: ["./seats.component.scss"],
})
export class SeatsComponent implements OnInit {
  @Input() flightNumber: string;
  @Input() type: string;
  rowSeatName = SharedContants.rowSeatName;
  passangers: PassangerList[];
  isLoadingShown = true;
  checkedInText = SharedContants.text.checkedIn;
  notCheckedInText = SharedContants.text.notCheckedIn;
  wheelChairText = SharedContants.text.wheelChair;
  infantsText = SharedContants.text.infants;
  mealNotRequiredText = SharedContants.text.mealNotRequired;
  normalVegMealText = SharedContants.text.normalVegMeal;
  normalNonVegMealText = SharedContants.text.normalNonVegMeal;
  specialVegMealText = SharedContants.text.specialVegMeal;
  specialNonVegMealText = SharedContants.text.specialNonVegMeal;
  seatsArray;
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
          this.seatsArray = new Array(6)
            .fill(null)
            .map((row) => (row = new Array(25).fill([null])));
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
      if (this.type === "checkin") {
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
      } else {
        this.seatsArray[row][column] = [
          passanger,
          passanger.mealType,
          passanger.shopItem.length,
        ];
      }
    });
  }

  selectSeat(seat) {
    if (seat[0] !== null) {
      const dialogRef =
        this.type === "checkin"
          ? this.dialog.open(PassangerCheckinDetailsComponent, {
              data: { ...seat[0], airlinePassangers: this.seatsArray },
            })
          : this.dialog.open(PassangerInflightDetailsComponent, {
              data: { ...seat[0] },
            });
      dialogRef.afterClosed().subscribe((result) => {
      });
    }
  }
}
