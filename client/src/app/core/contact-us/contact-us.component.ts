import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { contactUsConstants } from 'src/app/constants/contactUsConstants';
import { CoreService } from '../core.service';
import { Router } from '@angular/router';

import { EmailValidator } from 'src/app/validators/emailValidator';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactUsConstants = contactUsConstants;

  errorServer: boolean = false;
  errorMsg: string = '';

  isSubmitted = false;

  contactUsForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, EmailValidator.validate()]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isSubmitted = true;
    this.coreService
      .createContact({
        fullName: this.contactUsForm.value.fullName || '',
        email: this.contactUsForm.value.email || '',
        phone: this.contactUsForm.value.phone || '',
        message: this.contactUsForm.value.message || '',
      })
      .subscribe({
        next: (response) => {
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
}
