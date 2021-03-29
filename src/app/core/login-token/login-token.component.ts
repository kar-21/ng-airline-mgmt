import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';
import { GetUserInfo, SaveUserInfo } from '../store/actions/user.action';
import { AppState } from '../store/states/app.state';
import jwt_decode from 'jwt-decode';
import { SharedContants } from 'src/app/shared/shared.constant';
import { UserTokenModel } from '../models/user-data.model';

@Component({
  selector: 'app-login-token',
  templateUrl: './login-token.component.html',
  styleUrls: ['./login-token.component.scss'],
})

export class LoginTokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private store: Store<AppState>,
    ) {
      this.route.queryParams.subscribe((params) => {
        if (params.token) {
          this.cookieService.set('token', params.token, 2);
          this.loginService.setIsLoggedIn(true);
          const userDetailsFromToken: UserTokenModel = jwt_decode(params.token);
        this.store.dispatch(
          new SaveUserInfo({
            userName: userDetailsFromToken.givenName,
            role: userDetailsFromToken.role,
          }),
        );
        this.store.dispatch(new GetUserInfo(userDetailsFromToken.userId));
        if (userDetailsFromToken.role === SharedContants.role.staffRole) {
          this.router.navigateByUrl('/checkIn');
        } else {
          this.router.navigateByUrl('/admin');
        }
      }
    });
  }

  ngOnInit(): void {}
}
