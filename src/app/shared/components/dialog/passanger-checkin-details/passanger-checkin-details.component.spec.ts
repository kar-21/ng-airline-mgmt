import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { PassangerCheckinDetailsComponent } from './passanger-checkin-details.component';

describe('PassangerCheckinDetailsComponent', () => {
  let component: PassangerCheckinDetailsComponent;
  let fixture: ComponentFixture<PassangerCheckinDetailsComponent>;
  const store = {
    dispatch: jasmine.createSpy('dispatch'),
    pipe: () =>
      of([
        {
          checkinServices: ['Assistance Required'],
          dateAndTimeOfDeparture: '2019-01-10T23:34:15.000Z',
          flightFrom: 'Bengaluru',
          flightNumber: '1267AB34',
          flightPartner: 'Indigo',
          flightTo: 'Mumbai',
          gate: 2,
          inflightServices: ['Assistance Required'],
          mealTypes: ['Not Required'],
          shopItem: ['eye cover'],
        },
        {
          checkinServices: ['baggage help', 'Assistance Required'],
          dateAndTimeOfDeparture: '2019-01-10T01:42:25.000Z',
          flightFrom: 'Bengaluru',
          flightNumber: '1220DB84',
          flightPartner: 'Spice Jet',
          flightTo: 'Delhi',
          gate: 3,
          inflightServices: ['hot water', 'coffee', 'Assistance Required'],
          mealTypes: ['Not Required', 'Veg Meal'],
          shopItem: [],
        },
      ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [PassangerCheckinDetailsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            flightNumber: '1220DB84',
            airlinePassangers: new Array(6).fill(null).map((row) => (row = new Array(25).fill([null])))
          },
        },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: Store,
          useValue: store,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerCheckinDetailsComponent);
    component = fixture.componentInstance;
    component.flightProperties = {
      flightFrom: '',
      flightTo: '',
      dateAndTimeOfDeparture: new Date(),
      flightNumber: '',
      flightPartner: '',
      gate: 1,
      checkinServices: [''],
      mealTypes: [''],
      shopItem: [''],
      inflightServices: [''],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add checkin service', () => {
    component.checkinServices = ['checkin', 'service'];
    component.addCheckinService({
      value: 'get coffee',
      input: document.createElement('input'),
    });
    expect(component.checkinServices).toEqual(['checkin', 'service', 'get coffee']);
  });

  it('should remove checkin service', () => {
    component.checkinServices = ['checkin', 'service'];
    component.removeCheckinService('service');
    expect(component.checkinServices).toEqual(['checkin']);
  });

  it('should dispatch action on save service', () => {
    component.saveServies();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch action on send checkin data', () => {
    component.sendCheckInDataToServer();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should add checkin service on dropdown select', () => {
    component.checkinServices = ['checkin'];
    component.selectedCheckinService({ option: { viewValue: 'service' } });
    expect(component.checkinServices).toEqual(['checkin', 'service']);
  });
  
  it('should on seat number changed to unoccupied seat', () => {
    component.passangersArray[0][3] = [null];
    component.seatNumber = 'B3';
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeFalsy();
    expect(component.showSeatValueChange).toBeTruthy();
  });
  
  it('should on seat number changed to occupied seat', () => {
    component.passangersArray[0][3] = [{ key: 'value' }];
    component.seatNumber = 'B3';
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeTruthy();
    expect(component.showSeatValueChange).toBeTruthy();
  });
  
  it('should on seat number changed to currently selected seat', () => {
    component.seatNumber = 'A3';
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeFalsy();
    expect(component.showSeatValueChange).toBeFalsy();
  });

  it('should change the seat number', fakeAsync(() => {
    component.selectedSeatNumber = 'A3';
    component.showSeatOccupied = true;
    component.seatNumber = 'B4';
    component.passportNumber = 'passportNumber';
    component.flightNumber = 'flightNumber';
    component.passangersArray[0][2][0] = {
      passportNumber: 'exchangePassportNumber',
      flightNumber: 'exchangeFlightNumber',
    };
    component.changeSeatnumber();
    tick(600);
    expect(store.dispatch).toHaveBeenCalled();
  }));
});
