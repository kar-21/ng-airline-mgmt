import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";

import { AirlineHttpService } from "./airline-http.service";

describe("AirlineHttpService", () => {
  let service: AirlineHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AirlineHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get Airline list", () => {
    service.getAirlineList().subscribe(() => {});
    const req = httpMock.expectOne(environment.backendAPI + "/getAirlineList");
    expect(req.request.method).toBe("GET");
  });

  it("should get passanger list List", () => {
    service.getPassangerListForFlight("flightNumber").subscribe(() => {});
    const req = httpMock.expectOne(
      environment.backendAPI + "/getPassangers/flightNumber"
    );
    expect(req.request.method).toBe("GET");
  });

  it("should update airline details", () => {
    service
      .updateAirlineDetailsFromKey("flightNumber", { key: "value" })
      .subscribe(() => {});
    const req = httpMock.expectOne(
      environment.backendAPI + "/updateAirlineList"
    );
    expect(req.request.method).toBe("PATCH");
  });

  it("should update passanger details", () => {
    service
      .updatePassangerDetailsFromKey("passportNumber", "flightNumber", {
        key: "value",
      })
      .subscribe(() => {});
    const req = httpMock.expectOne(environment.backendAPI + "/updatePassanger");
    expect(req.request.method).toBe("PATCH");
  });
});
