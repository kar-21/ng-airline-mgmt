import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { AirlineHttpService } from "src/app/shared/services/airline-http.service";
import { AppState } from "../states/app.state";
import {
  EPassangerAction,
  GetAirLineList,
  GetAirlineListSuccess,
} from "../actions/passanger.action";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AirlineList } from "src/app/shared/models/airline-list.model";

@Injectable()
export class PassangerEffect {
  constructor(
    private airlineHttpService: AirlineHttpService,
    private store: Store<AppState>,
    private actions: Actions
  ) {}

  airlineHttp;

  @Effect()
  getAirlineList = this.actions.pipe(
    ofType<GetAirLineList>(EPassangerAction.GetAirlineList),
    switchMap(() => this.airlineHttpService.getAirlineList()),
    switchMap((airlineHttp: AirlineList[]) =>
      of(new GetAirlineListSuccess(airlineHttp))
    )
  );
}
