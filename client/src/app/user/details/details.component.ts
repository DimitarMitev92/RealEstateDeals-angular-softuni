import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserCRUDService } from '../user-crud.service';

import { IOfferReturnData } from 'src/app/interfaces/offertInterfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offer!: IOfferReturnData;

  constructor(
    private route: ActivatedRoute,
    private userCrud: UserCRUDService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.userCrud.getOfferById(id).subscribe((response) => {
        this.offer = response;
      });
    });
  }
}
