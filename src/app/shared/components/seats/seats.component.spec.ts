import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PassangerCheckinDetailsComponent } from '../dialog/passanger-checkin-details/passanger-checkin-details.component';
import { PassangerInflightDetailsComponent } from '../dialog/passanger-inflight-details/passanger-inflight-details.component';

import { SeatsComponent } from './seats.component';

const dialog = { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of('') }) };

const passanger = {
  name: 'Name',
  passportNumber: 'NE124SC02353',
  address: '',
  dateOfBirth: new Date('12-03-1997'),
  contactNumber: '',
  flightNumber: 'NO353',
  seatNumber: 'A2',
  checkedIn: true,
  wheelChair: false,
  infants: false,
  checkinServices: [],
  mealType: 'NotRequired',
  shopItem: [],
  inflightServices: [],
};

describe('SeatsComponent', () => {
  let component: SeatsComponent;
  let fixture: ComponentFixture<SeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatsComponent],
      providers: [
        { provide: MatDialog, useValue: dialog },
        { provide: Store, useValue: { pipe: () => of({ flightNumber: [] }) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsComponent);
    component = fixture.componentInstance;
    component.flightNumber = 'flightNumber';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select seat and open passanger checkin dialog', () => {
    component.type = 'checkin';
    component.seatsArray = new Array(6).fill(null).map((row) => (row = new Array(25).fill([null])));
    component.seatsArray[0][1] = [passanger, 'checkin', 'no-wheel-chair'];
    component.selectSeat({ target: { id: '0-1' } });
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should select seat and open passanger checkin dialog', () => {
    component.type = 'inflight';
    component.seatsArray = new Array(6).fill(null).map((row) => (row = new Array(25).fill([null])));
    component.seatsArray[0][1] = [passanger, 'checkin', 'no-wheel-chair'];
    component.selectSeat({ target: { id: '0-1' } });
    expect(dialog.open).toHaveBeenCalled();
  });
});
