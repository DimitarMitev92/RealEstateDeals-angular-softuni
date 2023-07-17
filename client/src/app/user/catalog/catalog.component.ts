import { Component, OnInit } from '@angular/core';

import { catalogConstant } from 'src/app/constants/catalogConstants';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  catalogConstants = catalogConstant;
  allOffers: IOfferReturnData[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private userCRUD: UserCRUDService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userCRUD.getAllOffers().subscribe({
      next: (response) => {
        this.allOffers = response;
      },
      error: (msg) => {
        console.log(msg);
      },
    });
    this.isLoggedIn = Boolean(this.authService.getUserData());
  }
}
