import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { registerConstants } from 'src/app/constants/registerConstants';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerConstants = registerConstants;

  isSubmitted = false;

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
        password: this.registerForm.value.password,
      })
      .subscribe((userData: any) => {
        console.log(userData);
        this.authService.setUserData(userData);
        this.router.navigate(['']);
      });
  }
}
