import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerDetailsComponent } from './passanger-details.component';

describe('PassangerDetailsComponent', () => {
  let component: PassangerDetailsComponent;
  let fixture: ComponentFixture<PassangerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
