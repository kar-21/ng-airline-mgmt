import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineStaffComponent } from './airline-staff.component';

describe('AirlineStaffComponent', () => {
  let component: AirlineStaffComponent;
  let fixture: ComponentFixture<AirlineStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
