import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "../services/login.service";
import { SaveUserInfo } from "../store/actions/user.action";
import { AppState } from "../store/states/app.state";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.cookieService.delete("token");
    this.loginService.setIsLoggedIn(false);
    this.store.dispatch(
      new SaveUserInfo({
        userName: null,
        role: null,
      })
    );
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 2000);
  }
}
