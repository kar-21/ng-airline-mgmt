import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UpdatePassangerDetailsFromKey } from 'src/app/core/store/actions/passanger.action';
import { selectorAirlineList } from 'src/app/core/store/selector/passanger.selector';
import { AppState } from 'src/app/core/store/states/app.state';
import { AirlineList } from 'src/app/shared/models/airline-list.model';
import { SharedContants } from 'src/app/shared/shared.constant';

@Component({
  selector: 'app-passanger-checkin-details',
  templateUrl: './passanger-checkin-details.component.html',
  styleUrls: ['./passanger-checkin-details.component.scss'],
})
export class PassangerCheckinDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerCheckinDetailsComponent>,
    private store: Store<AppState>,
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
  checkinServicesForm: FormGroup;
  passangersArray;
  rowSeatName = SharedContants.rowSeatName;
  showSeatOccupied = false;
  showSeatValueChange = false;
  selectedSeatNumber;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  saveServiceDisabled = true;
  flightProperties: AirlineList;
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
      this.store.pipe(select(selectorAirlineList)).subscribe((airlineList: AirlineList[]) => {
        if (airlineList) {
          airlineList.forEach((airline: AirlineList) => {
            if (airline.flightNumber === this.data.flightNumber) {
              this.flightProperties = airline;
            }
          });
        }
      });
    }
  }

  onSeatNumberChange(event) {
    if (event.selectedSeatNumberString !== this.seatNumber) {
      this.showSeatValueChange = true;
      this.selectedSeatNumber = event.selectedSeatNumberString
      if (
          typeof this.passangersArray[event.seatNumberArray[0]][event.seatNumberArray[1]] === 'object' &&
          this.passangersArray[event.seatNumberArray[0]][event.seatNumberArray[1]][0] !== null
        ) {
          this.showSeatOccupied = true;
        } else {
          this.showSeatOccupied = false;
        }
    } else {
      this.showSeatOccupied = false;
      this.showSeatValueChange = false;
    }
  }

  changeSeatnumber() {
    if (this.showSeatOccupied && this.selectedSeatNumber) {
      const row = this.rowSeatName.indexOf(this.selectedSeatNumber.slice(0, 1));
      const column = +this.selectedSeatNumber.slice(1, this.selectedSeatNumber.length) - 1;
      const passangerForSeatExchange = this.passangersArray[row][column][0];
      this.store.dispatch(
        new UpdatePassangerDetailsFromKey({
          passangerPassportNumber: passangerForSeatExchange.passportNumber,
          flightNumber: passangerForSeatExchange.flightNumber,
          keyValuePair: { seatNumber: this.seatNumber },
        }),
      );
    }
    if (this.selectedSeatNumber) {
      setTimeout(() => {
        this.store.dispatch(
          new UpdatePassangerDetailsFromKey({
            passangerPassportNumber: this.passportNumber,
            flightNumber: this.flightNumber,
            keyValuePair: { seatNumber: this.selectedSeatNumber },
          }),
        );
        this.closeDialog();
      }, 500);
    }
  }

  sendCheckInDataToServer() {
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { checkedIn: !this.checkedIn },
      }),
    );
    this.closeDialog();
  }

  addCheckinService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
      this.saveServiceDisabled = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.saveServiceDisabled = false;
    }
  }

  removeCheckinService(checkinService: string): void {
    const index = this.checkinServices.indexOf(checkinService);
    if (index >= 0) {
      this.checkinServices.splice(index, 1);
      this.saveServiceDisabled = false;
    }
  }

  selectedCheckinService(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
      this.saveServiceDisabled = false;
    }
  }

  saveServies() {
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: { checkinServices: this.checkinServices },
      }),
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
