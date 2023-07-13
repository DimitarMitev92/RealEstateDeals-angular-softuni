import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILoginData, ILoginReturnData } from '../interfaces/authInterfaces';

import { serverUrl } from '../constants/serverConstants';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setUserData(userData: ILoginReturnData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clearUserData() {
    localStorage.removeItem('userData');
  }

  login(userData: ILoginData): Observable<ILoginData> {
    return this.http.post<ILoginData>(serverUrl.login, userData);
  }

  logout(): void {
    this.clearUserData();
    this.http.get<any>(serverUrl.logout);
  }
}
