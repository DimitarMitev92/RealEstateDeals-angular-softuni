import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverUrl } from '../constants/serverConstants';

import { IOfferData, IOfferReturnData } from '../interfaces/offertInterfaces';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCRUDService {
  constructor(private http: HttpClient) {}

  getAllOffers() {
    return this.http.get<IOfferReturnData[]>(serverUrl.offers);
  }

  getOfferById(id: string | null) {
    return this.http.get<IOfferReturnData>(`${serverUrl.offers}/${id}`);
  }

  createOffer(
    offerData: IOfferData,
    accessToken: string | string[]
  ): Observable<IOfferReturnData> {
    return this.http.post<IOfferReturnData>(serverUrl.offers, offerData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken,
      }),
    });
  }
}
