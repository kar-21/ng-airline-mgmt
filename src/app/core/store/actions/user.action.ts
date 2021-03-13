import { Action } from '@ngrx/store';
import { UserData, UserInfo } from '../../models/user-data.model';

export enum EUserAction {
  SaveUserInfo = 'save [user] information',
  GetUserInfo = 'get [user] information',
  GetUserInfoSuccess = 'get [user] information success',
}

export class SaveUserInfo implements Action {
  public readonly type = EUserAction.SaveUserInfo;
  constructor(public payload: UserData) {}
}

export class GetUserInfo implements Action {
  public readonly type = EUserAction.GetUserInfo;
  constructor(public payload: number) {}
}
export class GetUserInfoSuccess implements Action {
  public readonly type = EUserAction.GetUserInfoSuccess;
  constructor(public payload: UserInfo) {
  }
}

export type UserAction = SaveUserInfo | GetUserInfo | GetUserInfoSuccess;
