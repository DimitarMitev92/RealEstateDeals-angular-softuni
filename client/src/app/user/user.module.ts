import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [CreateComponent, EditComponent, ProfileComponent],
  imports: [CommonModule],
  exports: [CreateComponent, EditComponent, ProfileComponent],
})
export class UserModule {}
