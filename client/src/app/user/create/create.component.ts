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

  isSubmitted = true;

  createForm = this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    imageLink: ['', Validators.required, httpsValidator()],
    price: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}
}
