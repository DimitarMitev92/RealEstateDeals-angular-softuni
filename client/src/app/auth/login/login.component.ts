import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { loginConstants } from 'src/app/constants/loginConstants';
import { AuthService } from '../auth.service';
import { ILoginData } from 'src/app/interfaces/authInterfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginConstant = loginConstants;

  isSubmitted = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isSubmitted = true;
    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (response: ILoginData): void => {
          this.authService.setUserData(response);
          this.router.navigate(['']);
        },
        (error: any): void => {
          confirm(error.message);
        }
      );
  }
}
