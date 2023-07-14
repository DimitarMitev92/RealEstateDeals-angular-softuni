import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ProfileComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
  exports: [CreateComponent, EditComponent, ProfileComponent, DetailsComponent],
})
export class UserModule {}
