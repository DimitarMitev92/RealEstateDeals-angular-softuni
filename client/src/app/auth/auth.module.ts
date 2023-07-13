import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {
  login(email: string, password: string): void {}
}
