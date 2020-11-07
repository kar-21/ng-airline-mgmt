import { Action } from "@ngrx/store";
import { AirlineList } from "src/app/shared/models/airline-list.model";

export enum EPassangerAction {
  GetAirlineList = "get [airline] list information",
  GetAirlineListSuccess = "get [airline] list information success",
}

export class GetAirLineList implements Action {
  public readonly type = EPassangerAction.GetAirlineList;
}

export class GetAirlineListSuccess implements Action {
  public readonly type = EPassangerAction.GetAirlineListSuccess;
  constructor(public payload: AirlineList[]) {}
}

export type PassangerActions = GetAirLineList | GetAirlineListSuccess;
