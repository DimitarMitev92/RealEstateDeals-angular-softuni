import { Component } from '@angular/core';
import { registerConstants } from 'src/app/constants/registerConstants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerConstants = registerConstants;
}
