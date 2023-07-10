import { Component } from '@angular/core';

import { createConstants } from 'src/app/constants/createConstants';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createConstants = createConstants;
}
