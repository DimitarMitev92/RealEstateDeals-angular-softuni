import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ILoginData, IRegisterData } from '../interfaces/authInterfaces';

import { serverUrl } from '../constants/serverConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  getUserData(): string | null {
    return localStorage.getItem('userData');
  }

  getUserAccessToken(): string | string[] {
    return JSON.parse(localStorage.getItem('userData') || '{}').accessToken;
  }

  setUserData(userData: ILoginData | IRegisterData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(state: boolean): void {
    this.isLoggedIn = state;
  }

  clearUserData(): void {
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
