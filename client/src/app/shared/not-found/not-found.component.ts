import { Component } from '@angular/core';
import { notFoundConstants } from 'src/app/constants/notFoundConstants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  notFoundConstants = notFoundConstants;
}
