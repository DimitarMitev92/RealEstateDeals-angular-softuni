import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    HeroSectionComponent,
    AboutUsComponent,
    ContactUsComponent,
    CatalogComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeroSectionComponent,
    AboutUsComponent,
    ContactUsComponent,
    CatalogComponent,
    DetailsComponent,
  ],
})
export class MainModule {}
