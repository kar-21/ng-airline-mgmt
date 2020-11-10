import { AirlineList } from "src/app/shared/models/airline-list.model";
import { PassangerList } from "src/app/shared/models/passanger-list.model";

export interface PassangerState {
  airlineList: AirlineList[];
  passangerList: { [key: string]: PassangerList[] };
}

export const initialPassangerState: PassangerState = {
  airlineList: null,
  passangerList: null,
};
