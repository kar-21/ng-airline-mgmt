import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Inject, OnInit } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { UpdatePassangerDetailsFromKey } from "src/app/core/store/actions/passanger.action";
import { AppState } from "src/app/core/store/states/app.state";
import { SharedContants } from "src/app/shared/shared.constant";

@Component({
  selector: "app-passanger-inflight-details",
  templateUrl: "./passanger-inflight-details.component.html",
  styleUrls: ["./passanger-inflight-details.component.scss"],
})
export class PassangerInflightDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PassangerInflightDetailsComponent>,
    private store: Store<AppState>
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
    }
  }

  addInflightService(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim() && !this.inflightServices.includes(value)) {
      this.inflightServices.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeInflightService(inflightService: string): void {
    const index = this.inflightServices.indexOf(inflightService);
    if (index >= 0) {
      this.inflightServices.splice(index, 1);
    }
  }

  addShopItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim() && !this.shopItems.includes(value)) {
      this.shopItems.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeShopItem(shopItem: string): void {
    const index = this.shopItems.indexOf(shopItem);
    if (index >= 0) {
      this.shopItems.splice(index, 1);
    }
  }

  saveServies() {
    console.log(">>>services", this.inflightServices, this.shopItems);
    this.store.dispatch(
      new UpdatePassangerDetailsFromKey({
        passangerPassportNumber: this.passportNumber,
        flightNumber: this.flightNumber,
        keyValuePair: {
          inflightServices: this.inflightServices,
          shopItem: this.shopItems,
        },
      })
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
