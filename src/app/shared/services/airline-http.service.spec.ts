import { TestBed } from '@angular/core/testing';

import { AirlineHttpService } from './airline-http.service';

describe('AirlineHttpService', () => {
  let service: AirlineHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
