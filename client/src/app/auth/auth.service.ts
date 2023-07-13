import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  ILoginData,
  ILoginReturnData,
  IRegisterData,
  IRegisterReturnData,
} from '../interfaces/authInterfaces';

import { serverUrl } from '../constants/serverConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserData(): string | null {
    return localStorage.getItem('userData');
  }

  setUserData(userData: ILoginData | IRegisterData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clearUserData() {
    localStorage.removeItem('userData');
  }

  login(userData: ILoginData): Observable<ILoginData> {
    return this.http.post<ILoginData>(serverUrl.login, userData);
  }

  register(userData: IRegisterData): Observable<IRegisterData> {
    return this.http.post<IRegisterData>(serverUrl.register, userData);
  }

  logout(accessToken: string): void {
    this.clearUserData();
    const headers = new HttpHeaders().set('X-Authorization', accessToken);
    this.http.get<any>(serverUrl.logout, { headers });
  }
}
