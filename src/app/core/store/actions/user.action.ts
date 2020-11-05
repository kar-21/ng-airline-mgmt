import { Action } from "@ngrx/store";
import { UserData } from '../../models/user-data.model';

export enum EUserAction {
  SaveUserInfo = 'save [user] information'
}

export class SaveUserInfo implements Action {
  public readonly type = EUserAction.SaveUserInfo;
  constructor(public payload: UserData) {}
}

export type UserAction = SaveUserInfo;