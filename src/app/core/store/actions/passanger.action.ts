import { Action } from '@ngrx/store';
import { AirlineList } from 'src/app/shared/models/airline-list.model';
import { PassangerList } from 'src/app/shared/models/passanger-list.model';

export enum EPassangerAction {
  GetAirlineList = 'get [airline] list information',
  GetAirlineListSuccess = 'get [airline] list information success',
  UpdateAirlineDetailsFromKey = 'update a [airline] details listed in [key:  value]',
  GetPassangersListOfFlight = 'get [passangers] list of [flight]',
  GetPassangersListOfFlightSuccess = 'get [passangers] list of [flight] success',
  UpdatePassangerDetailsFromKey = 'update a [passanger] details listed in [key: value]',
  AddNewPassangerDetails = 'add a new [passanger] details',
}

export class GetAirLineList implements Action {
  public readonly type = EPassangerAction.GetAirlineList;
}

export class GetAirlineListSuccess implements Action {
  public readonly type = EPassangerAction.GetAirlineListSuccess;
  constructor(public payload: AirlineList[]) {}
}

export class UpdateAirlineDetailsFromKey implements Action {
  public readonly type = EPassangerAction.UpdateAirlineDetailsFromKey;
  constructor(
    public payload: {
      flightNumber: string;
      keyValuePair: object;
    },
  ) {}
}

export class GetPassangersListOfFlight implements Action {
  public readonly type = EPassangerAction.GetPassangersListOfFlight;
  constructor(public payload: string) {}
}

export class GetPassangerssListOfFlightSuccess implements Action {
  public readonly type = EPassangerAction.GetPassangersListOfFlightSuccess;
  constructor(public payload: { flightNumber: string; data: PassangerList[] }) {}
}

export class UpdatePassangerDetailsFromKey implements Action {
  public readonly type = EPassangerAction.UpdatePassangerDetailsFromKey;
  constructor(
    public payload: {
      passangerPassportNumber: string;
      flightNumber: string;
      keyValuePair: object;
    },
  ) {}
}

export class AddNewPassangerDetails implements Action {
  public readonly type = EPassangerAction.AddNewPassangerDetails;
  constructor(public payload: { flightNumber: string; data: PassangerList }) {}
}

export type PassangerActions =
  | GetAirLineList
  | GetAirlineListSuccess
  | UpdateAirlineDetailsFromKey
  | GetPassangersListOfFlight
  | GetPassangerssListOfFlightSuccess
  | UpdatePassangerDetailsFromKey
  | AddNewPassangerDetails;
