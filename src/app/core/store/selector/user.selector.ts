import { createSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';
import { AppState } from '../states/app.state';

const selectorUser = (state: AppState) => state.userData;

export const selectorUserName = createSelector(selectorUser, (state: UserState) => state.userName);

export const selectorUserRole = createSelector(selectorUser, (state: UserState) => state.role);

export const selectorUserInfo = createSelector(selectorUser, (state: UserState) => state);
