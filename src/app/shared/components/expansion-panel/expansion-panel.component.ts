import { Component, Input, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { GetPassangersListOfFlight } from 'src/app/core/store/actions/passanger.action';
import { AppState } from 'src/app/core/store/states/app.state';
import { AirlineList } from "../../models/airline-list.model";
import { SharedContants } from "../../shared.constant";

@Component({
  selector: "app-expansion-panel",
  templateUrl: "./expansion-panel.component.html",
  styleUrls: ["./expansion-panel.component.scss"],
})
export class ExpansionPanelComponent implements OnInit {
  @Input() set airline(airline: AirlineList) {
    if (airline) {
      this.flightFrom = airline.flightFrom;
      this.flightTo = airline.flightTo;
      this.flightNumber = airline.flightNumber;
      this.dateAndTimeOfDeparture = new Date(
        airline.dateAndTimeOfDeparture.toString()
      );
      this.date = this.getDate();
      this.time = this.getTime();
      this.flightNumber = airline.flightNumber;
      this.flightPartner = airline.flightPartner;
      this.gate = airline.gate;
    }
  }
  flightFrom: string;
  flightTo: string;
  flightNumber: string;
  dateAndTimeOfDeparture: Date;
  monthNames = SharedContants.monthNames;
  date: string;
  time: string;
  flightPartner: string;
  gate: number;
  isPanelOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  getDate(): string {
    console.log(
      `${this.dateAndTimeOfDeparture.getDate()}-${
        this.monthNames[this.dateAndTimeOfDeparture.getMonth()]
      }-${this.dateAndTimeOfDeparture.getFullYear()}`
    );
    return `${this.dateAndTimeOfDeparture.getDate()}-${
      this.monthNames[this.dateAndTimeOfDeparture.getMonth()]
    }-${this.dateAndTimeOfDeparture.getFullYear()}`;
  }

  getTime(): string {
    let time;
    if (this.dateAndTimeOfDeparture.getHours() > 9) {
      time = this.dateAndTimeOfDeparture.getHours() + ":";
    } else {
      time = "0" + this.dateAndTimeOfDeparture.getHours() + ":";
    }
    if (this.dateAndTimeOfDeparture.getMinutes() > 9) {
      time = time + this.dateAndTimeOfDeparture.getMinutes() + " GMT";
    } else {
      time = time + "0" + this.dateAndTimeOfDeparture.getMinutes() + " GMT";
    }
    if (Math.floor(this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) > 9) {
      time =
        time +
        "-" +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) +
        ":";
    } else if (
      Math.floor(this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) >= 0
    ) {
      time =
        time +
        "-0" +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) +
        ":";
    } else if (
      Math.floor(this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) > -9
    ) {
      time =
        time +
        "+0" +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) +
        ":";
    } else {
      time =
        time +
        "+" +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() / 60) +
        ":";
    }
    if (Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() % 60) > 9) {
      time =
        time +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() % 60);
    } else {
      time =
        time +
        "0" +
        Math.floor(-this.dateAndTimeOfDeparture.getTimezoneOffset() % 60);
    }
    return time;
  }

  setPanelOpen() {
    this.isPanelOpen = true;
    this.store.dispatch(new GetPassangersListOfFlight(this.flightNumber));
  }
  
  setPanelClose() {
    this.isPanelOpen = false;
  }
}
