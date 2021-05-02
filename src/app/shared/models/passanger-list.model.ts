export interface PassangerList {
  name: string;
  passportNumber: string;
  address: string;
  dateOfBirth: Date;
  contactNumber: number;
  flightNumber: string;
  seatNumber: string;
  checkedIn: boolean;
  wheelChair: boolean;
  infants: boolean;
  checkinServices: string[];
  mealType: string;
  shopItem: string[];
  inflightServices: string[];
}
