import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverUrl } from '../constants/serverConstants';

import { IOfferData, IOfferReturnData } from '../interfaces/offerInterfaces';

import { Observable } from 'rxjs';
import { IFollowerReturnData } from '../interfaces/followerInterface';

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

  updateOffer(
    idOffer: string,
    offerData: IOfferData,
    accessToken: string | string[]
  ): Observable<IOfferReturnData> {
    return this.http.put<IOfferReturnData>(
      `${serverUrl.offers}/${idOffer}`,
      offerData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Authorization': accessToken,
        }),
      }
    );
  }

  deleteOffer(idOffer: string, accessToken: string | string[]) {
    return this.http.delete(`${serverUrl.offers}/${idOffer}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken,
      }),
    });
  }

  createOfferFollower(offerData: IOfferReturnData, accessToken: string) {
    return this.http.post(serverUrl.offersFollowers, offerData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken,
      }),
    });
  }

  getAllOffersFollowers(): Observable<IFollowerReturnData> {
    return this.http.get<IFollowerReturnData>(serverUrl.offersFollowers);
  }

  getOffersByFollowerId(id: string): Observable<IFollowerReturnData[]> {
    const encodedUriId = encodeURIComponent(`="${id}"`);
    console.log(encodedUriId);
    return this.http.get<IFollowerReturnData[]>(
      `${serverUrl.offersFollowers}${encodedUriId}`
    );
  }
}
