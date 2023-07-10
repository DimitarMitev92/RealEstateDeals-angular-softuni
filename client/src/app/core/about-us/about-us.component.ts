import { Component } from '@angular/core';

import { aboutUsConstants } from 'src/app/constants/aboutUsConstants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  aboutUsConstants = aboutUsConstants;
}
