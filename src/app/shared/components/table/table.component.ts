import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { selectorPassangerListOfFlight } from "src/app/core/store/selector/passanger.selector";
import { AppState } from "src/app/core/store/states/app.state";
import { PassangerList } from "../../models/passanger-list.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PassangerDetailsComponent } from "../dialog/passanger-details/passanger-details.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedContants } from "../../shared.constant";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() flightNumber: string;
  @Input() type: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns;
  dataSource: MatTableDataSource<PassangerList>;
  rowSeatName = SharedContants.rowSeatName;
  mealNotRequiredText = SharedContants.text.mealNotRequired;
  normalVegMealText = SharedContants.text.normalVegMeal;
  normalNonVegMealText = SharedContants.text.normalNonVegMeal;
  specialVegMealText = SharedContants.text.specialVegMeal;
  specialNonVegMealText = SharedContants.text.specialNonVegMeal;
  passangers;
  seatsArray;
  isLoadingShown = false;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.displayedColumns =
      this.type === "checkin"
        ? [
            "name",
            "seatNumber",
            "passportNumber",
            "checkedIn",
            "wheelChair",
            "infants",
            "edit",
          ]
        : ["name", "seatNumber", "passportNumber", "meal", "edit"];
    this.store
      .pipe(select(selectorPassangerListOfFlight))
      .subscribe((passangers) => {
        if (passangers && passangers[this.flightNumber]) {
          this.passangers = passangers[this.flightNumber];
          this.dataSource = new MatTableDataSource(
            passangers[this.flightNumber]
          );
          this.seatsArray = new Array(6)
            .fill(null)
            .map((row) => (row = new Array(25).fill([null])));
          this.updateSeatsArray();
          this.isLoadingShown = false;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateSeatsArray() {
    console.log(">>>", this.passangers);
    this.passangers.forEach((passanger: PassangerList) => {
      const row = this.rowSeatName.indexOf(passanger.seatNumber.slice(0, 1));
      const column =
        +passanger.seatNumber.slice(1, passanger.seatNumber.length) - 1;
      this.seatsArray[row][column] = [passanger];
    });
  }

  openPassangerDetails(passanger) {
    console.log(">>>", passanger);
    const dialogRef = this.dialog.open(PassangerDetailsComponent, {
      data: { ...passanger, airlinePassangers: this.seatsArray },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(">>closed");
    });
  }
}
