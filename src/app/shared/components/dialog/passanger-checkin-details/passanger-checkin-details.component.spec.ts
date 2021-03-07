import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { of } from "rxjs/internal/observable/of";

import { PassangerCheckinDetailsComponent } from "./passanger-checkin-details.component";

describe("PassangerCheckinDetailsComponent", () => {
  let component: PassangerCheckinDetailsComponent;
  let fixture: ComponentFixture<PassangerCheckinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [PassangerCheckinDetailsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: Store,
          useValue: { pipe: () => of(""), dispatch: () => {} },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerCheckinDetailsComponent);
    component = fixture.componentInstance;
    component.flightProperties = {
      flightFrom: "",
      flightTo: "",
      dateAndTimeOfDeparture: new Date(),
      flightNumber: "",
      flightPartner: "",
      gate: 1,
      checkinServices: [""],
      mealTypes: [""],
      shopItem: [""],
      inflightServices: [""],
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
