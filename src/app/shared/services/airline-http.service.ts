import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AirlineList } from '../models/airline-list.model';

@Injectable({
  providedIn: "root",
})
export class AirlineHttpService {
  constructor(private http: HttpClient) {
  }

  getAirlineList(): Observable<AirlineList[]> {
    console.log('>>inside service');
    return this.http.get<AirlineList[]>(environment.backendAPI + "/airlineList");
  }
}
