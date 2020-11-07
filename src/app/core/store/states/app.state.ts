import { RouterReducerState } from "@ngrx/router-store";
import { initialPassangerState, PassangerState } from "./passanger.state";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
  router?: RouterReducerState;
  userData: UserState;
  passangerData: PassangerState;
}

export const initialAppState: AppState = {
  userData: initialUserState,
  passangerData: initialPassangerState,
};
