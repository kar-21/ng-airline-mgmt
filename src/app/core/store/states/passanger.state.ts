import { AirlineList } from "src/app/shared/models/airline-list.model";

export interface PassangerState {
  airlineList: AirlineList[];
}

export const initialPassangerState: PassangerState = {
  airlineList: [null],
};
