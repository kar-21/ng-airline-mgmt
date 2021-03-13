import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { UpdateAirlineDetailsFromKey } from 'src/app/core/store/actions/passanger.action';
import { AppState } from 'src/app/core/store/states/app.state';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.scss'],
})
export class AirlineDetailsComponent implements OnInit {
  @Input() data;
  mealType: string[];
  checkinServices: string[];
  inflightServices: string[];
  shopItems: string[];
  isSubPanelOpen = false;
  passangerFlightNumber: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  formDirty = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private store: Store<AppState>) {}

  setPanelOpen() {
    this.isSubPanelOpen = true;
  }

  setPanelClose() {
    this.isSubPanelOpen = false;
  }

  ngOnInit(): void {
    this.passangerFlightNumber = this.data.flightNumber;
    this.mealType = Object.assign([], this.data.mealType);
    this.inflightServices = Object.assign([], this.data.inflightServices);
    this.shopItems = Object.assign([], this.data.shopItem);
    this.checkinServices = Object.assign([], this.data.checkinServices);
  }

  addCheckinService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.checkinServices.includes(value)) {
      this.checkinServices.push(value.trim());
      this.formDirty = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.formDirty = false;
    }
  }

  removeCheckinService(checkinService: string): void {
    const index = this.checkinServices.indexOf(checkinService);
    if (index >= 0) {
      this.checkinServices.splice(index, 1);
      this.formDirty = false;
    }
  }

  addMeal(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.mealType.includes(value)) {
      this.mealType.push(value.trim());
      this.formDirty = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.formDirty = false;
    }
  }

  removeMeal(meal: string): void {
    const index = this.mealType.indexOf(meal);
    if (index >= 0 && meal !== 'Not Required') {
      this.mealType.splice(index, 1);
      this.formDirty = false;
    }
  }

  addInflightService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
      this.formDirty = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.formDirty = false;
    }
  }

  removeInflightService(inflightService: string): void {
    const index = this.inflightServices.indexOf(inflightService);
    if (index >= 0) {
      this.inflightServices.splice(index, 1);
      this.formDirty = false;
    }
  }

  addShopItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
      this.formDirty = false;
    }
    // Reset the input value
    if (input) {
      input.value = '';
      this.formDirty = false;
    }
  }

  removeShopItem(shopItem: string): void {
    const index = this.shopItems.indexOf(shopItem);
    if (index >= 0) {
      this.shopItems.splice(index, 1);
      this.formDirty = false;
    }
  }

  saveSetting() {
    const keyValuePairs = {
      checkinServices: this.checkinServices,
      mealTypes: this.mealType,
      shopItem: this.shopItems,
      inflightServices: this.inflightServices,
    };
    this.store.dispatch(
      new UpdateAirlineDetailsFromKey({
        flightNumber: this.passangerFlightNumber,
        keyValuePair: keyValuePairs,
      }),
    );
    this.formDirty = true;
  }
}
