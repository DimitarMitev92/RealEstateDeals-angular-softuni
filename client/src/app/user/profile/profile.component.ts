import { Component } from '@angular/core';

import { profileConstants } from 'src/app/constants/profileConstants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileConstants = profileConstants;
}
