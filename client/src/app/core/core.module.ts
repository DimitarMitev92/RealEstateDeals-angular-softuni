import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeroSectionComponent,
    ContactUsComponent,
    FooterComponent,
    GlobalLoaderComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HeaderComponent,
    HeroSectionComponent,
    ContactUsComponent,
    FooterComponent,
    GlobalLoaderComponent,
  ],
})
export class CoreModule {}
