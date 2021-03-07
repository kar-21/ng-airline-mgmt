import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs/internal/observable/of";
import { LoginService } from "../services/login.service";

import { LogoutComponent } from "./logout.component";

describe("LogoutComponent", () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      providers: [
        {
          provide: LoginService,
          useValue: {
            setIsLoggedIn: () => {
              return { pipe: () => of("") };
            },
          },
        },
        {
          provide: CookieService,
          useValue: {
            delete: () => "",
          },
        },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
        { provide: Store, useValue: { dispatch: () => {} } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
