import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerInflightDetailsComponent } from './passanger-inflight-details.component';

describe('PassangerInflightDetailsComponent', () => {
  let component: PassangerInflightDetailsComponent;
  let fixture: ComponentFixture<PassangerInflightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangerInflightDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerInflightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
