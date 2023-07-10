import { Component } from '@angular/core';

import { contactUsConstants } from 'src/app/constants/contactUsConstants';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactUsConstants = contactUsConstants;
}
