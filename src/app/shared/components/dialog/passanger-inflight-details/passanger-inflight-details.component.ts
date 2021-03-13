import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UpdatePassangerDetailsFromKey } from 'src/app/core/store/actions/passanger.action';
import { selectorAirlineList } from 'src/app/core/store/selector/passanger.selector';
import { AppState } from 'src/app/core/store/states/app.state';
import { AirlineList } from 'src/app/shared/models/airline-list.model';
import { SharedContants } from 'src/app/shared/shared.constant';

@Component({
  selector: 'app-passanger-inflight-details',
  templateUrl: './passanger-inflight-details.component.html',
  styleUrls: ['./passanger-inflight-details.component.scss'],
})
export class PassangerInflightDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerInflightDetailsComponent>,
    private store: Store<AppState>,
  ) {}

  name: string;
  seatNumber: string;
  address: string;
  passportNumber: string;
  contactNumber: number;
  flightNumber: string;
  mealType: string;
  inflightServices: string[];
  shopItems: string[];
  rowSeatName = SharedContants.rowSeatName;
  mealNotRequiredText = SharedContants.text.mealNotRequired;
  normalVegMealText = SharedContants.text.normalVegMeal;
  normalNonVegMealText = SharedContants.text.normalNonVegMeal;
  specialVegMealText = SharedContants.text.specialVegMeal;
  specialNonVegMealText = SharedContants.text.specialNonVegMeal;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  saveDisabled = true;
  form: FormGroup;
  flightProperties: AirlineList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      this.seatNumber = this.data.seatNumber;
      this.address = this.data.address;
      this.passportNumber = this.data.passportNumber;
      this.contactNumber = this.data.contactNumber;
      this.flightNumber = this.data.flightNumber;
      this.mealType = this.data.mealType;
      this.inflightServices = Object.assign([], this.data.inflightServices);
      this.shopItems = Object.assign([], this.data.shopItem);
      this.form = new FormGroup({
        mealTypeField: new FormControl(this.mealType, [Validators.required]),
      });
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
    this.form.get('mealTypeField').valueChanges.subscribe(value => {
      if (this.saveDisabled) {
        this.saveDisabled = false
      }
    })
  }

  addInflightService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
      this.saveDisabled = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.saveDisabled = false;
    }
  }

  removeInflightService(inflightService: string): void {
    const index = this.inflightServices.indexOf(inflightService);
    if (index >= 0) {
      this.inflightServices.splice(index, 1);
      this.saveDisabled = false;
    }
  }

  selectedInFlightService(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
      this.saveDisabled = false;
    }
  }

  addShopItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
      this.saveDisabled = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.saveDisabled = false;
    }
  }

  removeShopItem(shopItem: string): void {
    const index = this.shopItems.indexOf(shopItem);
    if (index >= 0) {
      this.shopItems.splice(index, 1);
      this.saveDisabled = false;
    }
  }

  selectedShopItem(event) {
    const value = event.option.viewValue;
    if ((value || '').trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
      this.saveDisabled = false;
    }
  }

  saveServies() {
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: {
          mealType: this.form.get('mealTypeField').value,
          inflightServices: this.inflightServices,
          shopItem: this.shopItems,
        },
      }),
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
