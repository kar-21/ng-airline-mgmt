export interface AirlineList {
  flightFrom: string;
  flightTo: string;
  dateAndTimeOfDeparture: Date;
  flightNumber: string;
  flightPartner: string;
  gate: number;
  checkinServices: string[];
  mealTypes: string[];
  shopItem: string[];
  inflightServices: string[];
}
