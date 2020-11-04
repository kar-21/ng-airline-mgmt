import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "./core/service/login.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

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
    private router: Router
  ) {}
  ngOnInit() {
    this.cookieValue = this.cookieService.get("token");
    if (this.cookieValue) {
      console.log(">>>", jwt_decode(this.cookieValue));
      this.loginService.setIsLoggedIn(true);
      this.userName = jwt_decode(this.cookieValue).givenName;
    } else {
      this.router.navigateByUrl('/login');
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
