import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { httpsValidator } from 'src/app/validators/httpsValidator';

import { createConstants } from 'src/app/constants/createConstants';

import { UserCRUDService } from '../user-crud.service';
import { AuthService } from 'src/app/auth/auth.service';
import {
  IOfferData,
  IOfferReturnData,
} from 'src/app/interfaces/offerInterfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createConstants = createConstants;

  isSubmitted = false;

  createForm = this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    imageUrl: ['', [Validators.required, httpsValidator()]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    information: ['', [Validators.required, Validators.minLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    private userCRUD: UserCRUDService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isSubmitted = true;

    const offerData = this.createForm.value;
    const accessToken = this.authService.getUserAccessToken();
    this.userCRUD.createOffer(offerData, accessToken).subscribe({
      next: (response) => {
        console.log('Current Position: ', response);
        this.router.navigate([`${response._id}/details`]);
      },
      error: (msg) => {
        console.log('Error Getting Location: ', msg);
      },
    });
  }
}
