import { RouterReducerState } from "@ngrx/router-store";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
  router?: RouterReducerState;
  userData: UserState;
}

export const initialAppState: AppState = {
  userData: initialUserState,
};
