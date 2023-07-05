import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [SpinnerComponent, NotFoundComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent, NotFoundComponent],
})
export class SharedModule {}
