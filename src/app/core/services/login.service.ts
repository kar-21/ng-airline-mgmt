import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../models/user-data.model';

interface GoogleRequest {
  redirectURI: string;
}

@Injectable({
  providedIn: 'root',
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

  sendGoogleRequest(): Observable<GoogleRequest> {
    return this.http.get<GoogleRequest>(environment.backendAPI + '/login');
  }

  getUserInfo(userId: number): Observable<UserData> {
    return this.http.get<UserData>(environment.backendAPI + '/login/userInfo/' + userId);
  }
}
