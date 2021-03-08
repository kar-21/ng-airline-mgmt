import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";

import { LoginService } from "./login.service";

describe("LoginService", () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set loggedin status", () => {
    service.setIsLoggedIn(true);
    service.isLoggedIn.subscribe((value: boolean) => {
      expect(value).toBeTruthy();
    });
  });

  it("should set loggedin status", () => {
    service.isLoggedIn.next(true);
    service.getIsLoggedIn().subscribe((value: boolean) => {
      expect(value).toBeTruthy();
    });
  });

  it("should send google request", () => {
    service.sendGoogleRequest().subscribe(() => {});
    const req = httpMock.expectOne(environment.backendAPI + "/login");
    expect(req.request.method).toBe("GET");
  });
});
