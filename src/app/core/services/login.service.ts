import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface googleRequest {
  redirectURI: string;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  redirectURL: string;
  constructor(private http: HttpClient) {}

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  sendGoogleRequest(): Observable<googleRequest> {
    return this.http.get<googleRequest>(environment.backendAPI + "/login");
  }
}
