export interface PassangerList {
  name: string;
  passportNumber: string;
  address: string;
  contactNumber: number;
  flightNumber: string;
  seatNumber: string;
  checkedIn: boolean;
  wheelChair: boolean;
  infants: boolean;
  checkinSerivces: string[];
  mealType: string;
  shopItem: string[];
  inflightServices: string[];
}
