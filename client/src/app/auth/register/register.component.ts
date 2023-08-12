import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { registerConstants } from 'src/app/constants/registerConstants';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { EmailValidator } from 'src/app/validators/emailValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerConstants = registerConstants;

  isSubmitted = false;

  errorServer: boolean = false;
  errorMsg: string = '';

  typePassword: string = 'password';

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, EmailValidator.validate()]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.passwordMatchValidator }
  );

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isSubmitted = true;
    this.authService
      .register({
        fullName: this.registerForm.value.fullName,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
      })
      .subscribe({
        next: (response) => {
          this.authService.setUserData(response);
          this.registerForm.reset();
          this.router.navigate(['']);
        },
        error: (msg) => {
          this.errorServer = true;
          console.log(msg);
          if (msg.status === 409) {
            this.errorMsg = 'There is already a user with the same email.';
          }
          if (msg.status === 0) {
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
  }

  onToggleShowHandler() {
    if (this.typePassword == 'text') {
      this.typePassword = 'password';
    } else {
      this.typePassword = 'text';
    }
  }
}
