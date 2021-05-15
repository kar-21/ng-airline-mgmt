import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AddNewPassangerDetails, GetPassangersListOfFlight, UpdatePassangerDetailsFromKey } from 'src/app/core/store/actions/passanger.action';
import { AppState } from 'src/app/core/store/states/app.state';
import { SharedContants } from 'src/app/shared/shared.constant';
import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { selectorAirlineList } from 'src/app/core/store/selector/passanger.selector';
import { AirlineList } from 'src/app/shared/models/airline-list.model';

@Component({
  selector: 'app-passanger-details',
  templateUrl: './passanger-details.component.html',
  styleUrls: ['./passanger-details.component.scss'],
})
export class PassangerDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerDetailsComponent>,
    private store: Store<AppState>,
  ) {}

  name: string;
  seatNumber: string;
  address: string;
  passportNumber: string;
  contactNumber: number;
  dateOfBirth: Date;
  checkedIn: boolean;
  wheelChair: boolean;
  infants: boolean;
  checkinServices: string[];
  flightNumber: string;
  isNewPassanger = false;
  form: FormGroup;
  formName: FormGroup;
  passangersArray;
  mealType: string;
  inflightServices: string[];
  shopItems: string[];
  rowSeatName = SharedContants.rowSeatName;
  mealNotRequiredText = SharedContants.text.mealNotRequired;
  normalVegMealText = SharedContants.text.normalVegMeal;
  normalNonVegMealText = SharedContants.text.normalNonVegMeal;
  specialVegMealText = SharedContants.text.specialVegMeal;
  specialNonVegMealText = SharedContants.text.specialNonVegMeal;
  showSeatOccupied = false;
  showSeatSelectedError = false;
  isNewPassangerAlreadyPresent = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  flightProperties: AirlineList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      this.seatNumber = this.data.seatNumber;
      this.address = this.data.address;
      this.passportNumber = this.data.passportNumber;
      this.contactNumber = this.data.contactNumber;
      this.dateOfBirth = this.data.dateOfBirth ? this.data.dateOfBirth.toString().split('T')[0] : '';
      this.checkedIn = this.data.checkedIn;
      this.wheelChair = this.data.wheelChair;
      this.infants = this.data.infants;
      this.mealType = this.data.mealType;
      this.inflightServices = Object.assign([], this.data.inflightServices);
      this.shopItems = Object.assign([], this.data.shopItem);
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
      this.form = new FormGroup({
        seatNumberField: new FormControl(this.seatNumber, [
          Validators.required,
          Validators.pattern('^[A-F][1-9]$|^[A-F]1[0-9]$|^[A-F]2[0-5]$'),
        ]),
        passportNumberField: new FormControl(this.passportNumber, [
          Validators.required,
          Validators.pattern('^[A-Z0-9]*$'),
        ]),
        addressField: new FormControl(this.address),
        contactNumberField: new FormControl(this.contactNumber, [Validators.pattern('^[0-9]*$')]),
        dateOfBirthField: new FormControl(this.dateOfBirth),
        checkedInField: new FormControl(this.checkedIn, [Validators.required]),
        mealTypeField: new FormControl(this.mealType, [Validators.required]),
        wheelChairField: new FormControl(this.wheelChair, [Validators.required]),
        infantsField: new FormControl(this.infants, [Validators.required]),
        checkedInServiceField: new FormControl(this.checkinServices),
        inflightServiceField: new FormControl(this.inflightServices),
        shopItemsField: new FormControl(this.shopItems),
      });
      if (this.data.isNewPassanger) {
        this.formName = new FormGroup({
          nameField: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]),
        });
        this.isNewPassanger = this.data.isNewPassanger;
      }
    }

    this.form.get('passportNumberField').valueChanges.subscribe((value) => {
      if (value) {
        let existingPassportArray = [];
        this.passangersArray.forEach((column) => {
          const existingPassportInColumn = column.filter(
            (passanger) => passanger[0] && passanger[0].passportNumber === value,
          );
          existingPassportArray = existingPassportArray.concat(existingPassportInColumn);
        });
        if (existingPassportArray.length) {
          this.isNewPassangerAlreadyPresent = true;
        } else {
          this.isNewPassangerAlreadyPresent = false;
        }
      } else {
        this.isNewPassangerAlreadyPresent = false;
      }
    });
  }

  onSeatNumberChange(event) {
    if (event.selectedSeatNumberString !== this.seatNumber) {
      this.form.get('seatNumberField').setValue(event.selectedSeatNumberString);
      this.form.get('seatNumberField').markAsDirty();
      this.showSeatSelectedError = false;
      if (
        typeof this.passangersArray[event.seatNumberArray[0]][event.seatNumberArray[1]] === 'object' &&
        this.passangersArray[event.seatNumberArray[0]][event.seatNumberArray[1]][0] !== null
        ) {
          this.showSeatOccupied = true;
        } else {
          this.showSeatOccupied = false;
        }
      } else {
        this.form.get('seatNumberField').setValue(this.seatNumber);
        this.form.get('seatNumberField').markAsDirty();
      this.showSeatOccupied = false;
      if (this.isNewPassanger) {
        this.showSeatSelectedError = true
      }
    }
  }

  addCheckinService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
      this.form.get('checkedInServiceField').markAsTouched();
      this.form.get('checkedInServiceField').markAsDirty();
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.form.get('checkedInServiceField').markAsTouched();
      this.form.get('checkedInServiceField').markAsDirty();
    }
  }

  selectedCheckinService(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
      this.form.get('checkedInServiceField').markAsTouched();
      this.form.get('checkedInServiceField').markAsDirty();
    }
  }

  removeCheckinService(checkinService: string): void {
    const index = this.checkinServices.indexOf(checkinService);
    if (index >= 0) {
      this.checkinServices.splice(index, 1);
      this.form.get('checkedInServiceField').markAsTouched();
      this.form.get('checkedInServiceField').markAsDirty();
    }
  }

  addInflightService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
      this.form.get('inflightServiceField').markAsTouched();
      this.form.get('inflightServiceField').markAsDirty();
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.form.get('inflightServiceField').markAsTouched();
      this.form.get('inflightServiceField').markAsDirty();
    }
  }

  selectedInFlightService(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
      this.form.get('inflightServiceField').markAsTouched();
      this.form.get('inflightServiceField').markAsDirty();
    }
  }

  removeInflightService(inflightService: string): void {
    const index = this.inflightServices.indexOf(inflightService);
    if (index >= 0) {
      this.inflightServices.splice(index, 1);
      this.form.get('inflightServiceField').markAsTouched();
      this.form.get('inflightServiceField').markAsDirty();
    }
  }

  addShopItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
      this.form.get('shopItemsField').markAsTouched();
      this.form.get('shopItemsField').markAsDirty();
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.form.get('shopItemsField').markAsTouched();
      this.form.get('shopItemsField').markAsDirty();
    }
  }

  selectedShopItem(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
      this.form.get('shopItemsField').markAsTouched();
      this.form.get('shopItemsField').markAsDirty();
    }
  }

  removeShopItem(shopItem: string): void {
    const index = this.shopItems.indexOf(shopItem);
    if (index >= 0) {
      this.shopItems.splice(index, 1);
      this.form.get('shopItemsField').markAsTouched();
      this.form.get('shopItemsField').markAsDirty();
    }
  }

  saveSetting() {
    const newSeatNumber = this.form.get('seatNumberField').value;
    if (this.showSeatOccupied && !this.isNewPassanger) {
      const passangerForSeatExchange = newSeatNumber;
      this.store.dispatch(
        new UpdatePassangerDetailsFromKey({
          passangerPassportNumber: passangerForSeatExchange.passportNumber,
          flightNumber: passangerForSeatExchange.flightNumber,
          keyValuePair: { seatNumber: this.seatNumber },
        }),
      );
    }
    if (!this.isNewPassanger) {
      this.store.dispatch(
        new UpdatePassangerDetailsFromKey({
          passangerPassportNumber: this.passportNumber,
          flightNumber: this.flightNumber,
          keyValuePair: {
            checkinServices: this.checkinServices,
            inflightServices: this.inflightServices,
            shopItem: this.shopItems,
            seatNumber: this.form.get('seatNumberField').value,
            passportNumber: this.form.get('passportNumberField').value,
            address: this.form.get('addressField').value,
            contactNumber: this.form.get('contactNumberField').value,
            checkedIn: this.form.get('checkedInField').value,
            mealType: this.form.get('mealTypeField').value,
            wheelChair: this.form.get('wheelChairField').value,
            infants: this.form.get('infantsField').value,
            dateOfBirth: this.form.get('dateOfBirthField').value,
          },
        }),
      );
      this.store.dispatch(new GetPassangersListOfFlight(this.flightNumber));
      this.closeDialog();
    } else {
      setTimeout(() => {
        this.store.dispatch(
          new AddNewPassangerDetails({
            flightNumber: this.flightNumber,
            data: {
              name: this.formName.get('nameField').value,
              flightNumber: this.flightNumber,
              checkinServices: this.checkinServices,
              inflightServices: this.inflightServices,
              shopItem: this.shopItems,
              seatNumber: this.form.get('seatNumberField').value,
              passportNumber: this.form.get('passportNumberField').value,
              address: this.form.get('addressField').value,
              contactNumber: this.form.get('contactNumberField').value,
              checkedIn: this.form.get('checkedInField').value,
              mealType: this.form.get('mealTypeField').value,
              wheelChair: this.form.get('wheelChairField').value,
              infants: this.form.get('infantsField').value,
              dateOfBirth: this.form.get('dateOfBirthField').value,
            },
          }),
        );
        this.store.dispatch(new GetPassangersListOfFlight(this.flightNumber));
        this.closeDialog();
      }, 500);
    }
  }

  isFormInvalid() {
    if (this.isNewPassanger) {
      return (
        this.form.invalid ||
        this.form.pristine ||
        this.showSeatOccupied ||
        this.isNewPassangerAlreadyPresent ||
        this.formName.invalid ||
        this.formName.pristine
      );
    }
    return this.form.invalid || this.form.pristine || this.isNewPassangerAlreadyPresent;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
