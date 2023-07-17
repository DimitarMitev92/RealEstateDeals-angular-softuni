import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { loginGuard } from './app-login.guard';
import { ownerGuard } from './app-owner.guard';

import { HeroSectionComponent } from './core/hero-section/hero-section.component';
import { CatalogComponent } from './user/catalog/catalog.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailsComponent } from './user/details/details.component';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthService } from './auth/auth.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HeroSectionComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':id/details', pathMatch: 'full', component: DetailsComponent },
  { path: 'create', component: CreateComponent, canActivate: [loginGuard] },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [loginGuard, ownerGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
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
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
