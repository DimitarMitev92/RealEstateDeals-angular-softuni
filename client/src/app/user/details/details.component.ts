import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { IPopupDelete } from 'src/app/interfaces/popupDeleteInterfaces';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCRUD: UserCRUDService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idOffer = params.get('id');
      this.userCRUD.getOfferById(idOffer).subscribe((response) => {
        this.offer = response;
        let userDataJSON = this.authService.getUserData();
        if (userDataJSON !== null) {
          let userId = JSON.parse(userDataJSON)._id;
          let ownerId = this.offer._ownerId;
          userId === ownerId ? (this.isOwner = true) : (this.isOwner = false);
        }
      });
    });

    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  onShowDeletePopup() {
    this.isShowDeletePopup = !this.isShowDeletePopup;
  }

  onNewEventShowDeleteHandler(value: IPopupDelete) {
    console.log(value);
    this.isShowDeletePopup = value.isShowDeletePopup;
    if (value.isWantToDeleteOffer) {
      console.log('Delete offer');
      console.log(this.offer._id);
      let userDataJSON = this.authService.getUserData();
      if (userDataJSON !== null) {
        let userAccessToken = JSON.parse(userDataJSON).accessToken;
        this.userCRUD.deleteOffer(this.offer._id, userAccessToken).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/profile']);
          },
          error: (msg) => {
            console.log(msg);
          },
        });
      }
    }
  }
}
