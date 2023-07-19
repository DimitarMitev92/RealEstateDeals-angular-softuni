import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offer!: IOfferReturnData;

  isLoggedIn: boolean = false;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
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
    console.log('isLoggedIn: ', this.isLoggedIn);
  }
}
