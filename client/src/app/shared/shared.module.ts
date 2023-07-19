import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardComponent } from './card/card.component';
import { ShortPipe } from '../pipes/short.pipe';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NotFoundComponent,
    CardComponent,
    ShortPipe,
    PopupComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [SpinnerComponent, NotFoundComponent, CardComponent, PopupComponent],
})
export class SharedModule {}
