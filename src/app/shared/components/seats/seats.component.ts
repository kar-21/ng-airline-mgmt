import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  styleUrls: ["./seats.component.scss"],
})
export class SeatsComponent implements OnInit {
  seatsArray = new Array(6)
    .fill(null)
    .map((row) => (row = new Array(21).fill(null)));
  rowSeatName = ["A", "B", "C", "D", "E", "F"];
  constructor() {}

  ngOnInit(): void {
    console.table(this.seatsArray);
  }
}
