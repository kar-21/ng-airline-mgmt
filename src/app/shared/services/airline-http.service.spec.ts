import { HttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AirlineHttpService } from "./airline-http.service";

describe("AirlineHttpService", () => {
  let service: AirlineHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AirlineHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
