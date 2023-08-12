import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { editConstants } from 'src/app/constants/editConstants';
import { UserCRUDService } from '../user-crud.service';
import {
  IOfferData,
  IOfferReturnData,
} from 'src/app/interfaces/offerInterfaces';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpsValidator } from 'src/app/validators/httpsValidator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editConstants = editConstants;

  errorServer: boolean = false;
  errorMsg: string = '';

  isSubmitted = false;

  idOffer!: string;

  offer: IOfferReturnData = {
    title: '',
    location: '',
    quadrature: '',
    floors: '',
    imageUrl: '',
    price: '',
    information: '',
    _ownerId: '',
    _id: '',
    _createdOn: 0,
    ownerInfo: { fullName: '', username: '', email: '', phone: '' },
  };

  editForm = this.fb.group({
    title: ['', [Validators.required]],
    location: ['', [Validators.required]],
    quadrature: ['', [Validators.required]],
    floors: ['', [Validators.required]],
    imageUrl: ['', [Validators.required, HttpsValidator.validate()]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    information: ['', [Validators.required, Validators.minLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userCrud: UserCRUDService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idOffer = id!;
      this.userCrud.getOfferById(this.idOffer).subscribe({
        next: (response) => {
          this.offer = response;
          this.editForm.patchValue({
            title: this.offer.title || '',
            location: this.offer.location || '',
            quadrature: this.offer.quadrature || '',
            floors: this.offer.floors || '',
            imageUrl: this.offer.imageUrl || '',
            price: this.offer.price || '',
            information: this.offer.information || '',
          });
        },
        error: (msg) => {
          console.log(msg);
          this.errorServer = true;
          if (msg.status === 403) {
            this.authService.clearUserData();
            this.router.navigate(['/login']);
          }
          if (msg.status === 404) {
            this.router.navigate(['/catalog']);
          }

          if (msg.status === 0) {
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    const offerData: IOfferData = {
      title: this.editForm.value.title || '',
      location: this.editForm.value.location || '',
      quadrature: this.editForm.value.quadrature || '',
      floors: this.editForm.value.floors || '',
      imageUrl: this.editForm.value.imageUrl || '',
      price: this.editForm.value.price || '',
      information: this.editForm.value.information || '',
      ownerInfo: { fullName: '', username: '', email: '', phone: '' },
    };
    const userData = this.authService.getUserData();
    if (userData) {
      offerData.ownerInfo = JSON.parse(userData);
    }
    const accessToken = this.authService.getUserAccessToken();
    this.userCrud.updateOffer(this.idOffer, offerData, accessToken).subscribe({
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
