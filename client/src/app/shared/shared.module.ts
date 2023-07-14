import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [SpinnerComponent, NotFoundComponent, CardComponent],
  imports: [CommonModule, RouterModule],
  exports: [SpinnerComponent, NotFoundComponent, CardComponent],
})
export class SharedModule {}
