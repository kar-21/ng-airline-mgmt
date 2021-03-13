import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

import { SeatsComponent } from "./seats.component";

describe("SeatsComponent", () => {
  let component: SeatsComponent;
  let fixture: ComponentFixture<SeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatsComponent],
      providers: [
        { provide: MatDialog, useValue: { open: () => {} } },
        { provide: Store, useValue: { pipe: () => of({ flightNumber: [] }) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsComponent);
    component = fixture.componentInstance;
    component.flightNumber = "flightNumber";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
