import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { PassangerState } from "../states/passanger.state";

const selectorPassangerData = (state: AppState) => state.passangerData;

export const selectorAirlineList = createSelector(
  selectorPassangerData,
  (state: PassangerState) => state.airlineList
);

export const selectorPassangerListOfFlight = createSelector(
  selectorPassangerData,
  (state: PassangerState) => state.passangerList
);
