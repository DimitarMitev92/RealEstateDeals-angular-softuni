import { Component, Input } from '@angular/core';
import { IFollowerReturnData } from 'src/app/interfaces/followerInterface';
import { IOfferFollowerReturnData } from 'src/app/interfaces/offerFollowerInterfaces';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() offer!:
    | IOfferReturnData
    | IFollowerReturnData
    | IOfferFollowerReturnData;
  idOffer!: string;
  idOfferOwner!: string;
  offerCreatedOn!: number;
}
