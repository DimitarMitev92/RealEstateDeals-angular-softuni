import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ProfileComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [CreateComponent, EditComponent, ProfileComponent, DetailsComponent],
})
export class UserModule {}
