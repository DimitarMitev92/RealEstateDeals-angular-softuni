import { Component, OnInit } from '@angular/core';

import { catalogConstant } from 'src/app/constants/catalogConstants';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';

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
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {}

  ngOnInit(): void {
    this.globalLoaderService.showLoader();
    this.userCRUD.getAllOffers().subscribe({
      next: (response) => {
        this.allOffers = response;
        this.globalLoaderService.hideLoader();
      },
      error: (msg) => {
        this.globalLoaderService.hideLoader();
        console.log(msg);
      },
    });
    this.isLoggedIn = Boolean(this.authService.getUserData());
  }
}
