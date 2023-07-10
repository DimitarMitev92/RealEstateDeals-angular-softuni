import { Component } from '@angular/core';

import { loginConstants } from 'src/app/constants/loginConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginConstant = loginConstants;
}
