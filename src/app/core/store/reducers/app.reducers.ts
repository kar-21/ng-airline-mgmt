import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { routerReducer } from '@ngrx/router-store';
import { UserReducer } from './user.reducer';
import { PassangerReducer } from './passanger.reducers';

export const AppReducer: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  userData: UserReducer,
  passangerData: PassangerReducer,
};
