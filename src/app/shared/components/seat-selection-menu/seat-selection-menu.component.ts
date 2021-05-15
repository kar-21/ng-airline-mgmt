import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedContants } from '../../shared.constant';

@Component({
  selector: 'app-seat-selection-menu',
  templateUrl: './seat-selection-menu.component.html',
  styleUrls: ['./seat-selection-menu.component.scss'],
})
export class SeatSelectionMenuComponent implements OnInit {
  @Input() set seatNumber(seatNumber: string) {
    this.selectedSeatNumber = seatNumber;
  }
  @Input() passangersArray;
  @Output() onSeatNumberChange: EventEmitter<{}> = new EventEmitter();
  rowSeatName = SharedContants.rowSeatName;
  columnSeatNumbrer = new Array(26).fill(null).map((column, index) => (column = index));
  selectedSeatNumber;

  constructor() {}

  ngOnInit(): void {}

  selectSeat(event) {
    const seat = event.target.id.split('-');
    this.selectedSeatNumber = `${this.rowSeatName[seat[0]]}${+seat[1] + 1}`;
    this.onSeatNumberChange.emit({selectedSeatNumberString: this.selectedSeatNumber, seatNumberArray: seat});
  }
}
