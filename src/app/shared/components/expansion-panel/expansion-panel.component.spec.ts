import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";

import { ExpansionPanelComponent } from "./expansion-panel.component";

describe("ExpansionPanelComponent", () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;
  const store = { dispatch: jasmine.createSpy("dispatch") };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPanelComponent],
      providers: [{ provide: Store, useValue: store }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set the airline details on data receviced", () => {
    component.airline = {
      flightFrom: "flightFrom",
      flightTo: "flightTo",
      dateAndTimeOfDeparture: new Date(),
      flightNumber: "flightNumber",
      flightPartner: "flightPartner",
      gate: 1,
      checkinServices: ["checkinServices"],
      mealTypes: ["mealTypes"],
      shopItem: ["shopItem"],
      inflightServices: ["inflightServices"],
    };
    expect(component.airlineDetailsData).toEqual({
      flightNumber: "flightNumber",
      mealType: ["mealTypes"],
      inflightServices: ["inflightServices"],
      shopItem: ["shopItem"],
      checkinServices: ["checkinServices"],
    });
  });

  it("should toggle seat map view", () => {
    component.changeView({ checked: false });
    expect(component.isSeatMapView).toBeFalsy();
  });

  it("should set panel open and call dispatch", () => {
    component.setPanelOpen();
    expect(component.isPanelOpen).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should set panel close", () => {
    component.setPanelClose();
    expect(component.isPanelOpen).toBeFalsy();
  });
});
