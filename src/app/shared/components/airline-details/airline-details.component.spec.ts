import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";

import { AirlineDetailsComponent } from "./airline-details.component";

describe("AirlineDetailsComponent", () => {
  let component: AirlineDetailsComponent;
  let fixture: ComponentFixture<AirlineDetailsComponent>;
  const store = { dispatch: jasmine.createSpy("dispatch") };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirlineDetailsComponent],
      providers: [{ provide: Store, useValue: store }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailsComponent);
    component = fixture.componentInstance;
    component.data = {
      flightNumber: "",
      mealType: "",
      inflightService: "",
      shopItem: "",
      checkinService: "",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set sub panel open on setPanelOpen", () => {
    component.setPanelOpen();
    expect(component.isSubPanelOpen).toBeTruthy();
  });

  it("should set sub panel close on setPanelClose", () => {
    component.setPanelClose();
    expect(component.isSubPanelOpen).toBeFalsy();
  });

  it("should remove checkin service", () => {
    component.checkinServices = ["checkin", "service"];
    component.removeCheckinService("service");
    expect(component.checkinServices).toEqual(["checkin"]);
  });

  it("should remove meal type", () => {
    component.mealType = ["veg", "nonVeg", "notRequired"];
    component.removeMeal("notRequired");
    expect(component.mealType).toEqual(["veg", "nonVeg"]);
  });

  it("should remove inflight service", () => {
    component.inflightServices = ["inflight", "service"];
    component.removeInflightService("inflight");
    expect(component.inflightServices).toEqual(["service"]);
  });

  it("should remove shop items", () => {
    component.shopItems = ["bag", "book", "tea"];
    component.removeShopItem("book");
    expect(component.shopItems).toEqual(["bag", "tea"]);
  });

  it("should add checkin service", () => {
    component.checkinServices = ["checkin", "service"];
    component.addCheckinService({
      value: "get coffee",
      input: document.createElement("input"),
    });
    expect(component.checkinServices).toEqual([
      "checkin",
      "service",
      "get coffee",
    ]);
  });

  it("should add meal", () => {
    component.mealType = ["veg", "nonVeg"];
    component.addMeal({
      value: "notRequired",
      input: document.createElement("input"),
    });
    expect(component.mealType).toEqual(["veg", "nonVeg", "notRequired"]);
  });

  it("should add inflight service", () => {
    component.inflightServices = ["inflight", "service"];
    component.addInflightService({
      value: "towel",
      input: document.createElement("input"),
    });
    expect(component.inflightServices).toEqual([
      "inflight",
      "service",
      "towel",
    ]);
  });

  it("should add shop item", () => {
    component.shopItems = ["bag", "book"];
    component.addShopItem({
      value: "tea",
      input: document.createElement("input"),
    });
    expect(component.shopItems).toEqual(["bag", "book", "tea"]);
  });

  it("should dispatch action on save settings", () => {
    component.saveSetting();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
