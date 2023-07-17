import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { contactUsConstants } from 'src/app/constants/contactUsConstants';
import { CoreService } from '../core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactUsConstants = contactUsConstants;

  isSubmitted = false;

  contactUsForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    message: ['', [Validators.required]],
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
        fullName: this.contactUsForm.value.fullName,
        email: this.contactUsForm.value.email,
        phone: this.contactUsForm.value.phone,
        message: this.contactUsForm.value.message,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['']);
        },
        error: (msg) => {
          confirm(msg.message);
        },
      });
  }
}
