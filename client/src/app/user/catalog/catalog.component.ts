import { Component, OnInit } from '@angular/core';

import { catalogConstant } from 'src/app/constants/catalogConstants';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offertInterfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  catalogConstants = catalogConstant;
  allOffers: IOfferReturnData[] = [];

  constructor(private userCRUD: UserCRUDService) {}

  ngOnInit(): void {
    this.userCRUD.getAllOffers().subscribe({
      next: (response) => {
        this.allOffers = response;
        console.log(this.allOffers);
      },
      error: (msg) => {
        alert(msg);
      },
    });
  }
}
