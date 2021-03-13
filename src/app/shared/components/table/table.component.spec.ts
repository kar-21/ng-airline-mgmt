import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const matDialogMock = { open: jasmine.createSpy('open') };
  const passamgerArray = [
    {
      passportNumber: '8CE9FBCBD5E14F',
      seatNumber: 'B3',
      checkedIn: false,
      wheelChair: true,
      infants: false,
      checkinServices: ['baggage help'],
      mealType: 'Veg Meal',
      shopItem: [],
      inflightServices: ['hot water', 'coffee'],
    },
    {
      passportNumber: '4CB0EF9B39234E',
      seatNumber: 'B4',
      checkedIn: false,
      wheelChair: true,
      infants: true,
      checkinServices: ['Assistance Required'],
      mealType: 'Not Required',
      shopItem: ['eye cover'],
      inflightServices: ['Assistance Required'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        {
          provide: Store,
          useValue: { pipe: () => of({ flightNumber: passamgerArray }) },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.flightNumber = 'flightNumber';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open passanger deatial dialog', () => {
    component.addNewPassanger();
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should open admin detials dialog', () => {
    component.isAdmin = true;
    component.openPassangerDetails([]);
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should open check in detials dialog', () => {
    component.isAdmin = false;
    (component.type = 'checkin'), component.openPassangerDetails([]);
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should open in flight detials dialog', () => {
    component.isAdmin = false;
    (component.type = 'inflight'), component.openPassangerDetails([]);
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should chenge the filter data on selecting None fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('None');
    expect(component.dataSource.data.length).toEqual(2);
  }));

  it('should chenge the filter data on selecting checked in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('checkedIn');
    expect(component.dataSource.data.length).toEqual(0);
  }));

  it('should chenge the filter data on selecting not checked in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('notCheckedIn');
    expect(component.dataSource.data.length).toEqual(2);
  }));

  it('should chenge the filter data on selecting wheel chair in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('wheelChair');
    expect(component.dataSource.data.length).toEqual(2);
  }));

  it('should chenge the filter data on selecting infants in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('infants');
    expect(component.dataSource.data.length).toEqual(1);
  }));

  it('should chenge the filter data on selecting checkin services in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('checkInServices');
    expect(component.dataSource.data.length).toEqual(2);
  }));

  it('should chenge the filter data on selecting meal not required in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('notRequried');
    expect(component.dataSource.data.length).toEqual(1);
  }));

  it('should chenge the filter data on selecting veg meal in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('vegMeal');
    expect(component.dataSource.data.length).toEqual(1);
  }));

  it('should chenge the filter data on selecting non veg meal in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('nonVegMeal');
    expect(component.dataSource.data.length).toEqual(0);
  }));

  it('should chenge the filter data on selecting special veg meal in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('specialVegMeal');
    expect(component.dataSource.data.length).toEqual(0);
  }));

  it('should chenge the filter data on selecting special non veg meal in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('specialNonVegMeal');
    expect(component.dataSource.data.length).toEqual(0);
  }));

  it('should chenge the filter data on selecting in flight services in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('inFLightServices');
    expect(component.dataSource.data.length).toEqual(2);
  }));

  it('should chenge the filter data on selecting shop items in fliter', fakeAsync(() => {
    component.form = new FormGroup({ filterField: new FormControl('') });
    component.passangers = passamgerArray;
    component.subscribeToFliterFeild();
    component.form.get('filterField').setValue('shopItems');
    expect(component.dataSource.data.length).toEqual(1);
  }));
});
