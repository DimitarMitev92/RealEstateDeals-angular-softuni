import { Component, OnInit } from '@angular/core';

import { profileConstants } from 'src/app/constants/profileConstants';
import { UserCRUDService } from '../user-crud.service';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { IRegisterData } from 'src/app/interfaces/authInterfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';
import { IFollowerReturnData } from 'src/app/interfaces/followerInterface';
import { IOfferFollowerReturnData } from 'src/app/interfaces/offerFollowerInterfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileConstants = profileConstants;

  errorServer: boolean = false;
  errorMsg: string = '';

  userData!: IRegisterData;
  userOffers!: IOfferReturnData[];
  userFollowOffers: IOfferFollowerReturnData[] = [];

  constructor(
    private userCRUD: UserCRUDService,
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {}

  ngOnInit(): void {
    this.globalLoaderService.showLoader();
    let userDataJSON = this.authService.getUserData();
    if (userDataJSON !== null) {
      this.userData = JSON.parse(userDataJSON);
      let userID = JSON.parse(userDataJSON)._id;
      this.userCRUD.getAllOffers().subscribe({
        next: (response) => {
          this.globalLoaderService.hideLoader();
          this.userOffers = response.filter(
            (offer) => offer._ownerId === userID
          );
        },
        error: (msg) => {
          console.log(msg);
          this.globalLoaderService.hideLoader();
          if (msg.status === 404) {
            this.userOffers = [];
          }
          if (msg.status === 0) {
            this.userOffers = [];
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
      this.userCRUD.getOffersByFollowerId(userID).subscribe({
        next: (response) => {
          this.userFollowOffers = response;
        },
        error: (msg) => {
          console.log(msg);
          this.errorServer = true;
          if (msg.status === 404) {
            this.userFollowOffers = [];
          }
          if (msg.status === 0) {
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
    } else {
      console.log('userData is not found in localStorage.');
    }
  }
}
