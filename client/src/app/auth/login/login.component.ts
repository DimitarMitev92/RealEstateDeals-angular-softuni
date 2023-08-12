import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { loginConstants } from 'src/app/constants/loginConstants';

import { AuthService } from '../auth.service';

import { EmailValidator } from 'src/app/validators/emailValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginConstant = loginConstants;

  isSubmitted = false;

  errorServer: boolean = false;
  errorMsg: string = '';

  typePassword: string = 'password';

  loginForm = this.fb.group({
    email: ['', [Validators.required, EmailValidator.validate()]],
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
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
      .subscribe({
        next: (response) => {
          this.authService.setUserData(response);
          this.loginForm.reset();
          this.router.navigate(['']);
        },
        error: (msg) => {
          this.errorServer = true;
          console.log(msg);
          if (msg.status === 403) {
            this.errorMsg = 'Email or password is wrong.';
          }
          if (msg.status === 0) {
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
  }

  onToggleShowPassword() {
    if (this.typePassword === 'text') {
      this.typePassword = 'password';
    } else {
      this.typePassword = 'text';
    }
  }
}
