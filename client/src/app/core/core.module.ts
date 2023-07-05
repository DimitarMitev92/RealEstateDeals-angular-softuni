import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, GlobalLoaderComponent, FooterComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, GlobalLoaderComponent, FooterComponent],
})
export class CoreModule {}
