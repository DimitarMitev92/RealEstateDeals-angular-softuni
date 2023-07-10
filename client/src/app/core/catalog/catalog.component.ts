import { Component } from '@angular/core';
import { catalogConstant } from 'src/app/constants/catalogConstants';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  catalogConstants = catalogConstant;
}
