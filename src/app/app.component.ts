import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "./core/service/login.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { AppState } from "./core/store/states/app.state";
import { select, Store } from "@ngrx/store";
import { SaveUserInfo } from "./core/store/actions/user.action";
import { selectorUserName } from "./core/store/selector/user.selector";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = "ng-airline-mgmt";
  isLoggedIn: boolean;
  cookieValue;
  unsubscribe: Subject<void> = new Subject();
  userName: string;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.pipe(select(selectorUserName)).subscribe((userName: string) => {
      this.userName = userName;
    });
  }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("token");
    if (this.cookieValue) {
      console.log(">>>", jwt_decode(this.cookieValue));
      this.loginService.setIsLoggedIn(true);
      this.store.dispatch(
        new SaveUserInfo({
          userName: jwt_decode(this.cookieValue).givenName,
          role: jwt_decode(this.cookieValue).role,
        })
      );
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  ngAfterViewInit() {
    this.loginService
      .getIsLoggedIn()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
