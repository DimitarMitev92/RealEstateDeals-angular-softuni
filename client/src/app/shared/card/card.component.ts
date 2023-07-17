import { Component, Input } from '@angular/core';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() offer!: IOfferReturnData;
  idOffer!: string;
  idOfferOwner!: string;
  offerCreatedOn!: number;
}
