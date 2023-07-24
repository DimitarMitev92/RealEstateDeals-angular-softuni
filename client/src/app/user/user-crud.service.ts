import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverUrl } from '../constants/serverConstants';

import { IOfferData, IOfferReturnData } from '../interfaces/offerInterfaces';

import { Observable } from 'rxjs';
import { IFollowerReturnData } from '../interfaces/followerInterface';
import { IOfferFollowerReturnData } from '../interfaces/offerFollowerInterfaces';
import {
  IOfferCommentData,
  IOfferCommentReturnData,
} from '../interfaces/commentInterfaces';

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
    return this.http.get<IFollowerReturnData>(serverUrl.offersFollowersGet);
  }

  getOffersByFollowerId(id: string): Observable<IOfferFollowerReturnData[]> {
    const encodedUriId = encodeURIComponent(`="${id}"`);
    return this.http.get<IOfferFollowerReturnData[]>(
      `${serverUrl.offersFollowersGet}${encodedUriId}`
    );
  }

  deleteOfferFollowerByOfferId(idOffer: string, accessToken: string): any {
    return this.http.delete(`${serverUrl.offersFollowers}/${idOffer}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken,
      }),
    });
  }

  createOfferComment(
    commentData: IOfferCommentData,
    accessToken: string | string[]
  ) {
    return this.http.post(serverUrl.offerComments, commentData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Authorization': accessToken,
      }),
    });
  }

  getCommentByOfferId(idOffer: string): Observable<IOfferCommentReturnData[]> {
    const encodedUriId = encodeURIComponent(`="${idOffer}"`);
    return this.http.get<IOfferCommentReturnData[]>(
      `${serverUrl.offerCommentsGet}${encodedUriId}`
    );
  }
}
