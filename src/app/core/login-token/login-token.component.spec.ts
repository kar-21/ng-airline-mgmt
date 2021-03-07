import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs/internal/observable/of";
import { LoginService } from "../services/login.service";

import { LoginTokenComponent } from "./login-token.component";

describe("LoginTokenComponent", () => {
  let component: LoginTokenComponent;
  let fixture: ComponentFixture<LoginTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginTokenComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              token:
                "eyJhbGciOiJIUzI1NiJ9.eyJnaXZlbk5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJhZG1pbiJ9.gB8TurTnGZw-kYlwOYJr9INSYma12tngamrCZQF4VWs",
            }),
          },
        },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
        { provide: CookieService, useValue: { set: () => {} } },
        { provide: LoginService, useValue: { setIsLoggedIn: () => {} } },
        { provide: Store, useValue: { dispatch: () => {} } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
