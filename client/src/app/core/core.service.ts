import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IContactData } from '../interfaces/contactInterface';

import { serverUrl } from '../constants/serverConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  createContact(contactData: IContactData): Observable<IContactData> {
    return this.http.post<IContactData>(serverUrl.contactUs, contactData);
  }
}
