import { Component, OnInit } from '@angular/core';

import { profileConstants } from 'src/app/constants/profileConstants';
import { UserCRUDService } from '../user-crud.service';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { IRegisterData } from 'src/app/interfaces/authInterfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileConstants = profileConstants;

  userData!: IRegisterData;
  userOffers!: IOfferReturnData[];

  constructor(private userCRUD: UserCRUDService) {}

  ngOnInit(): void {
    let userDataJSON = localStorage.getItem('userData');
    if (userDataJSON !== null) {
      this.userData = JSON.parse(userDataJSON);
      console.log(this.userData);
      let userID = JSON.parse(userDataJSON)._id;
      this.userCRUD.getAllOffers().subscribe({
        next: (response) => {
          this.userOffers = response.filter(
            (offer) => offer._ownerId === userID
          );
          console.log(this.userOffers);
        },
        error: (msg) => {
          console.log(msg);
        },
      });
    } else {
      console.log('userData is not found in localStorage.');
    }
  }
}
