import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ILoginData,
  ILoginReturnData,
  IRegisterData,
  IRegisterReturnData,
} from '../interfaces/authInterfaces';

import { serverUrl } from '../constants/serverConstants';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setUserData(userData: ILoginReturnData | IRegisterReturnData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clearUserData() {
    localStorage.removeItem('userData');
  }

  login(userData: ILoginData): Observable<ILoginData> {
    return this.http.post<ILoginData>(serverUrl.login, userData);
  }

  register(userData: IRegisterData) {
    return this.http.post<IRegisterData>(serverUrl.register, userData);
  }

  logout(): void {
    this.clearUserData();
    this.http.get<any>(serverUrl.logout);
  }
}
