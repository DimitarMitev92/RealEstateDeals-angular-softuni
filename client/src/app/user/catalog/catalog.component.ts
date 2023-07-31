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

  errorServer: boolean = false;
  errorMsg: string = '';

  allOffers: IOfferReturnData[] = [];
  isLoggedIn: boolean = false;

  options: string[] = [
    'Newest',
    'Oldest',
    'Cheapest',
    'Most Expensive',
    'Smallest quadrature',
    'Biggest quadrature',
  ];
  selectedOption: string = 'Oldest';

  searchTerm: string = '';
  filteredUsers!: any[];

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
        this.filteredUsers = this.allOffers;
        this.globalLoaderService.hideLoader();
      },
      error: (msg) => {
        this.globalLoaderService.hideLoader();
        this.errorServer = true;
        if (msg.status === 404) {
          this.allOffers = [];
        }
        if (msg.status === 0) {
          this.errorMsg =
            'Тhe server is down. We are working on fixing the problem.';
        }
      },
    });
    this.isLoggedIn = Boolean(this.authService.getUserData());
  }

  onRadioChange() {
    if (this.selectedOption === 'Newest') {
      this.filteredUsers = this.filteredUsers.sort(
        (a, b) => b._createdOn - a._createdOn
      );
    } else if (this.selectedOption === 'Oldest') {
      this.filteredUsers = this.filteredUsers.sort(
        (a, b) => a._createdOn - b._createdOn
      );
    } else if (this.selectedOption === 'Cheapest') {
      this.filteredUsers = this.filteredUsers.sort((a, b) => a.price - b.price);
    } else if (this.selectedOption === 'Most Expensive') {
      this.filteredUsers = this.filteredUsers.sort((a, b) => b.price - a.price);
    } else if (this.selectedOption === 'Smallest quadrature') {
      this.filteredUsers = this.filteredUsers.sort(
        (a, b) => a.quadrature - b.quadrature
      );
    } else if (this.selectedOption === 'Biggest quadrature') {
      this.filteredUsers = this.filteredUsers.sort(
        (a, b) => b.quadrature - a.quadrature
      );
    }
  }

  onSearch() {
    this.filteredUsers = this.allOffers.filter((user: any) =>
      user.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.selectedOption = '';
  }
}
