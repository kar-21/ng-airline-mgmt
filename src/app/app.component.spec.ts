import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { MediaObserver } from "@angular/flex-layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { AppComponent } from "./app.component";
import { LoginService } from "./core/services/login.service";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSidenavModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: LoginService,
          useValue: {
            getIsLoggedIn: () => {
              return { pipe: () => of("") };
            },
          },
        },
        {
          provide: CookieService,
          useValue: {
            get: () => "",
          },
        },
        {
          provide: MediaObserver,
          useValue: {
            asObservable: () => {
              return { pipe: () => of("") };
            },
            isActive: () => true,
          },
        },
        { provide: Router, useValue: {} },
        { provide: Store, useValue: { pipe: () => of("") } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-airline-mgmt'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ng-airline-mgmt");
  });
});
