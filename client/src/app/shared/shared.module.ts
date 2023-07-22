import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardComponent } from './card/card.component';
import { ShortPipe } from '../pipes/short.pipe';
import { ElapsedTimePipe } from '../pipes/elapsed-time.pipe';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NotFoundComponent,
    CardComponent,
    ShortPipe,
    ElapsedTimePipe,
    PopupComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SpinnerComponent,
    NotFoundComponent,
    CardComponent,
    ShortPipe,
    ElapsedTimePipe,
    PopupComponent,
  ],
})
export class SharedModule {}
