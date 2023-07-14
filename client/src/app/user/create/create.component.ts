import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { httpsValidator } from 'src/app/validators/httpsValidator';

import { createConstants } from 'src/app/constants/createConstants';

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

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.createForm.value);
  }
}
