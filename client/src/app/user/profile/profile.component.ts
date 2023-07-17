import { Component, OnInit } from '@angular/core';

import { profileConstants } from 'src/app/constants/profileConstants';
import { UserCRUDService } from '../user-crud.service';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { IRegisterData } from 'src/app/interfaces/authInterfaces';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileConstants = profileConstants;

  userData!: IRegisterData;
  userOffers!: IOfferReturnData[];

  constructor(
    private userCRUD: UserCRUDService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let userDataJSON = this.authService.getUserData();
    if (userDataJSON !== null) {
      this.userData = JSON.parse(userDataJSON);
      let userID = JSON.parse(userDataJSON)._id;
      this.userCRUD.getAllOffers().subscribe({
        next: (response) => {
          this.userOffers = response.filter(
            (offer) => offer._ownerId === userID
          );
        },
        error: (msg) => {
          console.log(msg);
          if (msg.status === 404) {
            this.userOffers = [];
          }
        },
      });
    } else {
      console.log('userData is not found in localStorage.');
    }
  }
}
