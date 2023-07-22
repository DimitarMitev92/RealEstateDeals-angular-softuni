import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { IPopupDelete } from 'src/app/interfaces/popupDeleteInterfaces';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';
import { IFollowerReturnData } from 'src/app/interfaces/followerInterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offer!: IOfferReturnData;

  isLoggedIn: boolean = false;
  isOwner: boolean = false;

  isShowDeletePopup: boolean = false;

  isHideContact: boolean = true;

  isFollowed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCRUD: UserCRUDService,
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {}

  ngOnInit() {
    this.globalLoaderService.showLoader();
    this.route.paramMap.subscribe((params) => {
      const idOffer = params.get('id');
      this.userCRUD.getOfferById(idOffer).subscribe({
        next: (response) => {
          this.globalLoaderService.hideLoader();
          this.offer = response;
          let userDataJSON = this.authService.getUserData();
          if (userDataJSON !== null) {
            let userId = JSON.parse(userDataJSON)._id;
            let ownerId = this.offer._ownerId;
            userId === ownerId ? (this.isOwner = true) : (this.isOwner = false);

            // Follow check
            this.userCRUD.getOffersByFollowerId(userId).subscribe({
              next: (response) => {
                if (response.length !== 0) {
                  let currentFollowOffer = response.filter(
                    (followed) => followed.idOffer === this.offer._id
                  );
                  console.log(
                    'Initial load currentFollowOffer:',
                    currentFollowOffer
                  );
                  if (currentFollowOffer.length !== 0) {
                    this.isFollowed = true;
                  }
                }
              },
              error: (msg) => {
                console.log(msg);
                this.isFollowed = false;
              },
            });

            //////////////////////////////////////

            /////////////////////////////////////
          }
        },
        error: (msg) => {
          console.log(msg);
          this.globalLoaderService.hideLoader();
        },
      });
    });

    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  onShowDeletePopup() {
    this.isShowDeletePopup = !this.isShowDeletePopup;
  }

  onNewEventShowDeleteHandler(value: IPopupDelete) {
    this.isShowDeletePopup = value.isShowDeletePopup;
    if (value.isWantToDeleteOffer) {
      let userDataJSON = this.authService.getUserData();
      if (userDataJSON !== null) {
        let userAccessToken = JSON.parse(userDataJSON).accessToken;
        this.userCRUD.deleteOffer(this.offer._id, userAccessToken).subscribe({
          next: (response) => {
            this.router.navigate(['/profile']);
          },
          error: (msg) => {
            console.log(msg);
          },
        });
      }
    }
  }

  onToggleShowContact() {
    this.isHideContact = !this.isHideContact;
  }

  onFollowOffer() {
    let userDataJSON = this.authService.getUserData();
    if (userDataJSON !== null) {
      if (this.isFollowed === false) {
        this.isFollowed = true;
        let userAccessToken = JSON.parse(userDataJSON).accessToken;
        let offerFollowerData = { ...this.offer, idOffer: this.offer._id };
        this.userCRUD
          .createOfferFollower(offerFollowerData, userAccessToken)
          .subscribe({
            next: (response) => {
              console.log(`initial offer: `, offerFollowerData);
              console.log(`response from createFollow: `, response);
            },
            error: (msg) => {
              console.log(msg);
            },
          });
      } else {
        this.isFollowed = false;
        let userDataJSON = this.authService.getUserData();
        if (userDataJSON !== null) {
          let userId = JSON.parse(userDataJSON)._id;
          let userAccessToken = JSON.parse(userDataJSON).accessToken;
          let idOfferFollower = '';
          this.userCRUD.getOffersByFollowerId(userId).subscribe({
            next: (response) => {
              idOfferFollower = response[0]._id;
              console.log('Response:', response);
              console.log(
                'Filtered response:',
                response.filter(
                  (followed) => followed.idOffer === this.offer._id
                )
              );
              let currentFollowOffer = response.filter(
                (followed) => followed.idOffer === this.offer._id
              );
              this.userCRUD
                .deleteOfferFollowerByOfferId(
                  currentFollowOffer[0]._id,
                  userAccessToken
                )
                .subscribe({
                  next: (response: any) => {
                    console.log(response);
                  },
                  error: (msg: any) => {
                    console.log(msg);
                  },
                });
            },
            error: (msg) => {
              console.log(msg);
            },
          });
        }
      }
    }
  }

  onBuyOffer() {
    console.log('buy is clicked!');
  }
}
