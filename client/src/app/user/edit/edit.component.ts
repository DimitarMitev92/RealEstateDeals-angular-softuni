import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { editConstants } from 'src/app/constants/editConstants';
import { UserCRUDService } from '../user-crud.service';
import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { httpsValidator } from 'src/app/validators/httpsValidator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editConstants = editConstants;

  isSubmitted = false;

  offer!: IOfferReturnData;

  editForm = this.fb.group({
    title: ['', [Validators.required]],
    location: ['', [Validators.required]],
    imageUrl: ['', [Validators.required, httpsValidator()]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    information: ['', [Validators.required, Validators.minLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userCrud: UserCRUDService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.userCrud.getOfferById(id).subscribe({
        next: (response) => {
          this.offer = response;
          this.editForm.patchValue({
            title: this.offer.title,
            location: this.offer.location,
            imageUrl: this.offer.imageUrl,
            price: this.offer.price,
            information: this.offer.information,
          });
        },
        error: (msg) => {
          console.log(msg);
        },
      });
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    const offerData = this.editForm.value;
    console.log(offerData);
  }
}
