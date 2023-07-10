import { Component } from '@angular/core';

import { editConstants } from 'src/app/constants/editConstants';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  editConstants = editConstants;
}
