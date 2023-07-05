import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [CreateComponent, EditComponent],
  imports: [CommonModule],
  exports: [CreateComponent, EditComponent],
})
export class UserModule {}
