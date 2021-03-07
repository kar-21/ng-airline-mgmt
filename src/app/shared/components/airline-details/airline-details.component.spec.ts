import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";

import { AirlineDetailsComponent } from "./airline-details.component";

describe("AirlineDetailsComponent", () => {
  let component: AirlineDetailsComponent;
  let fixture: ComponentFixture<AirlineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirlineDetailsComponent],
      providers: [{ provide: Store, useValue: { dispatch: () => {} } }],
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
});
