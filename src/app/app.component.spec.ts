import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { MediaObserver } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material/menu";
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
      imports: [RouterTestingModule, MatSidenavModule, MatMenuModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: LoginService,
          useValue: {
            getIsLoggedIn: () => {
              return { pipe: () => of(true) };
            },
            setIsLoggedIn: () => {},
          },
        },
        {
          provide: CookieService,
          useValue: {
            get: () =>
              "eyJhbGciOiJIUzI1NiJ9.eyJnaXZlbk5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJhZG1pbiJ9.gB8TurTnGZw-kYlwOYJr9INSYma12tngamrCZQF4VWs",
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
        {
          provide: Store,
          useValue: { pipe: () => of(""), dispatch: () => {} },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Airline Managment System'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Airline Managment System");
  });

  it("should get the cookie and save the user info", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const spyonStore = spyOn(
      fixture.debugElement.injector.get(Store),
      "dispatch"
    );
    app.ngOnInit();
    expect(spyonStore).toHaveBeenCalled();
  });

  it("should get logged in status", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngAfterViewInit();
    expect(app.isLoggedIn).toBeTruthy();
  });

  it("should toggle sidenav", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.toggled = false;
    app.toggleSideNav();
    expect(app.toggled).toBeTruthy();
  });
});
