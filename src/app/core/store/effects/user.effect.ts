import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { AppState } from '../states/app.state';
import { EUserAction, GetUserInfo, GetUserInfoSuccess } from '../actions/user.action';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { UserData } from '../../models/user-data.model';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffect {
  constructor(
    private loginSerivice: LoginService,
    private store: Store<AppState>,
    private actions: Actions,
    private snackBar: MatSnackBar,
  ) {}

  @Effect()
  getUserInfo = this.actions.pipe(
    ofType<GetUserInfo>(EUserAction.GetUserInfo),
    switchMap((data) => this.loginSerivice.getUserInfo(data.payload)),
    switchMap((userData: UserData) =>
      of(
        new GetUserInfoSuccess({
          fullName: userData[0].fullName,
          emailId: userData[0].emailId,
          photoURL: userData[0].photoURL,
        }),
      ),
    ),
    catchError((error) => of(this.snackBar.open('Server Error...!', null, { duration: 20000 }))),
  );
}
