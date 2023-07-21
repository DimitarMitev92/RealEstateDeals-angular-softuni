import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { IPopupDelete } from 'src/app/interfaces/popupDeleteInterfaces';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';

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
    console.log('Click Follow');
  }

  onBuyOffer() {
    console.log('Click Buy');
  }
}
