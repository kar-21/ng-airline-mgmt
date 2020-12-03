import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerCheckinDetailsComponent } from './passanger-checkin-details.component';

describe('PassangerCheckinDetailsComponent', () => {
  let component: PassangerCheckinDetailsComponent;
  let fixture: ComponentFixture<PassangerCheckinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangerCheckinDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerCheckinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
