import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { AirlineHttpService } from "src/app/shared/services/airline-http.service";
import { AppState } from "../states/app.state";
import {
  EPassangerAction,
  GetAirLineList,
  GetAirlineListSuccess,
  GetPassangersListOfFlight,
  GetPassangerssListOfFlightSuccess,
  UpdateAirlineDetailsFromKey,
  UpdatePassangerDetailsFromKey,
} from "../actions/passanger.action";
import { catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AirlineList } from "src/app/shared/models/airline-list.model";
import { PassangerList } from "src/app/shared/models/passanger-list.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class PassangerEffect {
  constructor(
    private airlineHttpService: AirlineHttpService,
    private store: Store<AppState>,
    private actions: Actions,
    private snackBar: MatSnackBar
  ) {}

  flightNumber: string;
  updatedFlightNumber: string;

  @Effect()
  getAirlineList = this.actions.pipe(
    ofType<GetAirLineList>(EPassangerAction.GetAirlineList),
    switchMap(() => this.airlineHttpService.getAirlineList()),
    switchMap((airlineHttp: AirlineList[]) =>
      of(new GetAirlineListSuccess(airlineHttp))
    ),
    catchError((error) =>
      of(this.snackBar.open("Server Error...!", null, { duration: 20000 }))
    )
  );

  @Effect()
  updateAirlineDetailsFromKey = this.actions.pipe(
    ofType<UpdateAirlineDetailsFromKey>(
      EPassangerAction.UpdateAirlineDetailsFromKey
    ),
    switchMap((data) => {
      this.updatedFlightNumber = data.payload.flightNumber;
      return this.airlineHttpService.updateAirlineDetailsFromKey(
        data.payload.flightNumber,
        data.payload.keyValuePair
      );
    }),
    switchMap(() => of(new GetAirLineList())),
    catchError((error) =>
      of(this.snackBar.open("Server Error...!", null, { duration: 20000 }))
    )
  );

  @Effect()
  getPassangerListOfFlight = this.actions.pipe(
    ofType<GetPassangersListOfFlight>(
      EPassangerAction.GetPassangersListOfFlight
    ),
    switchMap((data) => {
      this.flightNumber = data.payload;
      return this.airlineHttpService.getPassangerListForFlight(data.payload);
    }),
    switchMap((passangerList: PassangerList[]) =>
      of(
        new GetPassangerssListOfFlightSuccess({
          flightNumber: this.flightNumber,
          data: passangerList,
        })
      )
    ),
    catchError((error) =>
      of(this.snackBar.open("Server Error...!", null, { duration: 20000 }))
    )
  );

  @Effect()
  updatePassangerDetailsFromKey = this.actions.pipe(
    ofType<UpdatePassangerDetailsFromKey>(
      EPassangerAction.UpdatePassangerDetailsFromKey
    ),
    switchMap((data) => {
      this.updatedFlightNumber = data.payload.flightNumber;
      return this.airlineHttpService.updatePassangerDetailsFromKey(
        data.payload.passangerPassportNumber,
        data.payload.flightNumber,
        data.payload.keyValuePair
      );
    }),
    switchMap(() =>
      of(new GetPassangersListOfFlight(this.updatedFlightNumber))
    ),
    catchError((error) =>
      of(this.snackBar.open("Server Error...!", null, { duration: 20000 }))
    )
  );
}
