import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "./core/services/login.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { AppState } from "./core/store/states/app.state";
import { select, Store } from "@ngrx/store";
import { SaveUserInfo } from "./core/store/actions/user.action";
import { selectorUserName } from "./core/store/selector/user.selector";
import { MediaObserver } from "@angular/flex-layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = "Airline Managment System";
  isLoggedIn: boolean;
  cookieValue;
  unsubscribe: Subject<void> = new Subject();
  userName: string;
  isMobile: boolean;
  toggled: boolean;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private mediaObserver: MediaObserver,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.pipe(select(selectorUserName)).subscribe((userName: string) => {
      this.userName = userName;
    });
    this.mediaObserver
      .asObservable()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.isMobile = this.mediaObserver.isActive("xs");
        this.toggled = !this.isMobile;
      });
  }

  ngOnInit() {
    this.cookieValue = this.cookieService.get("token");
    if (this.cookieValue) {
      this.loginService.setIsLoggedIn(true);
      this.store.dispatch(
        new SaveUserInfo({
          userName: jwt_decode(this.cookieValue).givenName,
          role: jwt_decode(this.cookieValue).role,
        })
      );
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

  toggleSideNav() {
    this.toggled = !this.toggled;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
