import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpsValidator } from 'src/app/validators/httpsValidator';

import { createConstants } from 'src/app/constants/createConstants';

import { UserCRUDService } from '../user-crud.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IOfferData } from 'src/app/interfaces/offerInterfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createConstants = createConstants;

  errorServer: boolean = false;
  errorMsg: string = '';

  isSubmitted = false;

  createForm = this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    quadrature: ['', Validators.required],
    floors: ['', Validators.required],
    imageUrl: ['', [Validators.required, HttpsValidator.validate()]],
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

    let offerData: IOfferData = {
      title: this.createForm.value.title || '',
      location: this.createForm.value.location || '',
      quadrature: this.createForm.value.quadrature || '',
      floors: this.createForm.value.floors || '',
      imageUrl: this.createForm.value.imageUrl || '',
      price: this.createForm.value.price || '',
      information: this.createForm.value.information || '',
      ownerInfo: { fullName: '', username: '', email: '', phone: '' },
    };
    const userData = this.authService.getUserData();
    if (userData) {
      offerData.ownerInfo = JSON.parse(userData);
    }
    const accessToken = this.authService.getUserAccessToken();
    this.userCRUD.createOffer(offerData, accessToken).subscribe({
      next: (response) => {
        this.router.navigate([`${response._id}/details`]);
      },
      error: (msg) => {
        console.log(msg);
        this.errorServer = true;
        if (msg.status === 403) {
          this.authService.clearUserData();
          this.router.navigate(['/login']);
        }
        if (msg.status === 0) {
          this.errorMsg =
            'Тhe server is down. We are working on fixing the problem.';
        }
      },
    });
  }
}
