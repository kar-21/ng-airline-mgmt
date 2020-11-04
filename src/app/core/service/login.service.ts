import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

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

  sendGoogleRequest():Observable<any> {
    return this.http.get<any>("http://localhost:3000/login");
  }
}
