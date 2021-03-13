import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectorPassangerListOfFlight } from 'src/app/core/store/selector/passanger.selector';
import { AppState } from 'src/app/core/store/states/app.state';
import { PassangerList } from '../../models/passanger-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PassangerCheckinDetailsComponent } from '../dialog/passanger-checkin-details/passanger-checkin-details.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedContants } from '../../shared.constant';
import { PassangerInflightDetailsComponent } from '../dialog/passanger-inflight-details/passanger-inflight-details.component';
import { PassangerDetailsComponent } from '../dialog/passanger-details/passanger-details.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() flightNumber: string;
  @Input() type: string;
  @Input() isAdmin = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter = 'none';
  filterOptions;
  form: FormGroup;
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
    if (!this.isAdmin) {
      this.displayedColumns =
        this.type === 'checkin'
          ? SharedContants.tabel.displayedColumns.checkIn
          : SharedContants.tabel.displayedColumns.inFlight;
      this.filterOptions =
        this.type === 'checkin'
          ? SharedContants.tabel.filterOptions.checkIn
          : SharedContants.tabel.filterOptions.inFlight;
    } else {
      this.displayedColumns = SharedContants.tabel.displayedColumns.admin;
      this.filterOptions = SharedContants.tabel.filterOptions.admin;
    }
    this.form = new FormGroup({
      filterField: new FormControl(this.filter),
    });
    this.store.pipe(select(selectorPassangerListOfFlight)).subscribe((passangers) => {
      if (passangers && passangers[this.flightNumber]) {
        this.passangers = passangers[this.flightNumber];
        this.dataSource = new MatTableDataSource(passangers[this.flightNumber]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.seatsArray = new Array(6).fill(null).map((row) => (row = new Array(25).fill([null])));
        this.updateSeatsArray();
        this.isLoadingShown = false;
      }
    });
    this.subscribeToFliterFeild();
  }

  subscribeToFliterFeild() {
    this.form.get('filterField').valueChanges.subscribe((filterValue: string) => {
      let passangerData;
      switch (filterValue) {
        case 'checkedIn':
          passangerData = this.passangers.filter((value) => value.checkedIn === true);
          break;
        case 'notCheckedIn':
          passangerData = this.passangers.filter((value) => value.checkedIn === false);
          break;
        case 'wheelChair':
          passangerData = this.passangers.filter((value) => value.wheelChair === true);
          break;
        case 'infants':
          passangerData = this.passangers.filter((value) => value.infants === true);
          break;
        case 'checkInServices':
          passangerData = this.passangers.filter((value) => value.checkinServices.length > 0);
          break;
        case 'notRequried':
          passangerData = this.passangers.filter((value) => value.mealType === this.mealNotRequiredText);
          break;
        case 'vegMeal':
          passangerData = this.passangers.filter((value) => value.mealType === this.normalVegMealText);
          break;
        case 'nonVegMeal':
          passangerData = this.passangers.filter((value) => value.mealType === this.normalNonVegMealText);
          break;
        case 'specialVegMeal':
          passangerData = this.passangers.filter((value) => value.mealType === this.specialVegMealText);
          break;
        case 'specialNonVegMeal':
          passangerData = this.passangers.filter((value) => value.mealType === this.specialNonVegMealText);
          break;
        case 'inFLightServices':
          passangerData = this.passangers.filter((value) => value.inflightServices.length > 0);
          break;
        case 'shopItems':
          passangerData = this.passangers.filter((value) => value.shopItem.length > 0);
          break;
        default:
          passangerData = this.passangers;
      }
      this.dataSource = new MatTableDataSource(passangerData);
    });
  }

  updateSeatsArray() {
    this.passangers.forEach((passanger: PassangerList) => {
      const row = this.rowSeatName.indexOf(passanger.seatNumber.slice(0, 1));
      const column = +passanger.seatNumber.slice(1, passanger.seatNumber.length) - 1;
      this.seatsArray[row][column] = [passanger];
    });
  }

  addNewPassanger() {
    this.dialog.open(PassangerDetailsComponent, {
      data: {
        name: '',
        seatNumber: '',
        address: '',
        passportNumber: '',
        contactNumber: '',
        checkedIn: false,
        wheelChair: false,
        infants: false,
        mealType: 'Not Required',
        inflightServices: [],
        shopItems: [],
        checkinServices: [],
        flightNumber: this.flightNumber,
        airlinePassangers: this.seatsArray,
        isNewPassanger: true,
      },
    });
  }

  openPassangerDetails(passanger) {
    const dialogRef = this.isAdmin
      ? this.dialog.open(PassangerDetailsComponent, {
          data: {
            ...passanger,
            airlinePassangers: this.seatsArray,
            isNewPassanger: false,
          },
        })
      : this.type === 'checkin'
      ? this.dialog.open(PassangerCheckinDetailsComponent, {
          data: { ...passanger, airlinePassangers: this.seatsArray },
        })
      : this.dialog.open(PassangerInflightDetailsComponent, {
          data: { ...passanger },
        });
  }
}
