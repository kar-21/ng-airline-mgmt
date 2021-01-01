import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "process";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AirlineList } from "../models/airline-list.model";
import { PassangerList } from "../models/passanger-list.model";

@Injectable({
  providedIn: "root",
})
export class AirlineHttpService {
  options = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  getAirlineList(): Observable<AirlineList[]> {
    return this.http.get<AirlineList[]>(
      environment.backendAPI + "/getAirlineList"
    );
  }

  updateAirlineDetailsFromKey(
    flightNumber: string,
    keyValuePair: object
  ): Observable<any> {
    const body = { flightNumber: flightNumber, keyValuePair: keyValuePair };
    console.log("<<<", body);
    return this.http.patch<any>(
      environment.backendAPI + "/updateAirlineList",
      JSON.stringify(body),
      this.options
    );
  }

  getPassangerListForFlight(flightNumber: string): Observable<PassangerList[]> {
    return this.http.get<PassangerList[]>(
      environment.backendAPI + "/getPassangers/" + flightNumber
    );
  }

  updatePassangerDetailsFromKey(
    passportNumber: string,
    flightNumber: string,
    keyValuePair: object
  ): Observable<any> {
    const body = {
      passportNumber: passportNumber,
      flightNumber: flightNumber,
      keyValuePair: keyValuePair,
    };
    return this.http.patch<any>(
      environment.backendAPI + "/updatePassanger",
      JSON.stringify(body),
      this.options
    );
  }
}
