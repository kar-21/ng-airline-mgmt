import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SeatSelectionMenuComponent } from './seat-selection-menu.component';

describe('SeatSelectionMenuComponent', () => {
  let component: SeatSelectionMenuComponent;
  let fixture: ComponentFixture<SeatSelectionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, MatIconModule],
      declarations: [ SeatSelectionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatSelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set seat number', () => {
    component.seatNumber = 'A3'
    expect(component.selectedSeatNumber).toEqual('A3');
  });

  it('should send selected seat number', () => {
    component.selectSeat({target: {id: '0-2'}});
    expect(component.selectedSeatNumber).toEqual('A3');
  });
});
