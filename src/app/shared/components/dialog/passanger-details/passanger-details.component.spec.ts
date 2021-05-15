import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { PassangerDetailsComponent } from './passanger-details.component';

describe('PassangerDetailsComponent', () => {
  let component: PassangerDetailsComponent;
  let fixture: ComponentFixture<PassangerDetailsComponent>;
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
      declarations: [PassangerDetailsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            flightNumber: '1267AB34',
            airlinePassangers: [new Array(30).fill('B2')],
            dateOfBirth: new Date('12-01-1998'),
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
    fixture = TestBed.createComponent(PassangerDetailsComponent);
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

  it('should add checkin service on dropdown select', () => {
    component.checkinServices = ['checkin'];
    component.selectedCheckinService({ option: { viewValue: 'service' } });
    expect(component.checkinServices).toEqual(['checkin', 'service']);
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

  it('should add inflight service on dropdown select', () => {
    component.inflightServices = ['inflight'];
    component.selectedInFlightService({ option: { viewValue: 'service' } });
    expect(component.inflightServices).toEqual(['inflight', 'service']);
  });

  it('should add inflight service', () => {
    component.inflightServices = ['inflight', 'service'];
    component.addInflightService({
      value: 'get coffee',
      input: document.createElement('input'),
    });
    expect(component.inflightServices).toEqual(['inflight', 'service', 'get coffee']);
  });

  it('should remove inflight service', () => {
    component.inflightServices = ['inflight', 'service'];
    component.removeInflightService('service');
    expect(component.inflightServices).toEqual(['inflight']);
  });

  it('should add shop items on dropdown select', () => {
    component.shopItems = ['shop'];
    component.selectedShopItem({ option: { viewValue: 'service' } });
    expect(component.shopItems).toEqual(['shop', 'service']);
  });

  it('should add shop items', () => {
    component.shopItems = ['shop', 'service'];
    component.addShopItem({
      value: 'get coffee',
      input: document.createElement('input'),
    });
    expect(component.shopItems).toEqual(['shop', 'service', 'get coffee']);
  });

  it('should remove shop items', () => {
    component.shopItems = ['shop items', 'service'];
    component.removeShopItem('service');
    expect(component.shopItems).toEqual(['shop items']);
  });

  it('should dispatch action to save setings', fakeAsync(() => {
    component.form.get('seatNumberField').setValue('A21');
    component.showSeatOccupied = true;
    component.isNewPassanger = false;
    component.seatNumber = 'B4';
    component.passportNumber = 'passportNumber';
    component.flightNumber = 'flightNumber';
    component.passangersArray[0][2] = {
      passportNumber: 'exchangePassportNumber',
      flightNumber: 'exchangeFlightNumber',
    };
    component.saveSetting();
    tick(600);
    expect(store.dispatch).toHaveBeenCalled();
  }));

  it('should dispatch action to save setings for new passanger', fakeAsync(() => {
    component.form.get('seatNumberField').setValue('A21');
    component.showSeatOccupied = false;
    component.isNewPassanger = true;
    component.formName = new FormGroup({ nameField: new FormControl('') });
    component.form = new FormGroup({
      seatNumberField: new FormControl(''),
      passportNumberField: new FormControl(''),
      addressField: new FormControl(''),
      contactNumberField: new FormControl(''),
      dateOfBirthField: new FormControl(''),
      checkedInField: new FormControl(''),
      mealTypeField: new FormControl(''),
      wheelChairField: new FormControl(''),
      infantsField: new FormControl(''),
      checkedInServiceField: new FormControl(''),
      inflightServiceField: new FormControl(''),
      shopItemsField: new FormControl(''),
    });
    component.saveSetting();
    tick(600);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  }));

  it('should on seat number changed to unoccupied seat', () => {
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeFalsy();
  });

  it('should on seat number changed to occupied seat', () => {
    component.passangersArray[0][3] = { key: 'value' };
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeTruthy();
  });

  it('should on seat number changed to currently selected seat', () => {
    component.seatNumber = 'A3';
    component.isNewPassanger = true;
    component.onSeatNumberChange({ selectedSeatNumberString: 'A3', seatNumberArray: [0, 3] });
    expect(component.showSeatOccupied).toBeFalsy();
    expect(component.showSeatSelectedError).toBeTruthy();
  });
});
