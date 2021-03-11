import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "../services/login.service";
import { GetUserInfo, SaveUserInfo } from "../store/actions/user.action";
import { AppState } from "../store/states/app.state";
import jwt_decode from "jwt-decode";
import { SharedContants } from "src/app/shared/shared.constant";

@Component({
  selector: "app-login-token",
  templateUrl: "./login-token.component.html",
  styleUrls: ["./login-token.component.scss"],
})
export class LoginTokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.cookieService.set("token", params.token, 2);
        this.loginService.setIsLoggedIn(true);
        this.store.dispatch(
          new SaveUserInfo({
            userName: jwt_decode(params.token).givenName,
            role: jwt_decode(params.token).role,
          })
        );
        this.store.dispatch(new GetUserInfo(jwt_decode(params.token).userId));
        if (jwt_decode(params.token).role === SharedContants.role.staffRole) {
          this.router.navigateByUrl("/checkIn");
        } else {
          this.router.navigateByUrl("/admin");
        }
      }
    });
  }

  ngOnInit(): void {}
}
