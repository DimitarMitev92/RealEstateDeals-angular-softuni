import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { HeroSectionComponent } from './core/hero-section/hero-section.component';
import { CatalogComponent } from './core/catalog/catalog.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailsComponent } from './user/details/details.component';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HeroSectionComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':id/details', pathMatch: 'full', component: DetailsComponent },
  { path: 'create', component: CreateComponent },
  { path: ':id/edit', pathMatch: 'full', component: EditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
