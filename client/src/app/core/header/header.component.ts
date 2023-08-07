import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userData: any = null;
  isLoggedIn: boolean = false;

  showNavbarMenu: string = 'sm:block';
  navbarMenuIcon: string = 'fa-x';

  constructor(private authService: AuthService, private router: Router) {}

  ngDoCheck(): void {
    const userDataString = this.authService.getUserData();
    if (userDataString !== null) {
      this.authService.setIsLoggedIn(true);
      this.isLoggedIn = this.authService.getIsLoggedIn();
      this.userData = JSON.parse(userDataString);
    } else {
      this.authService.setIsLoggedIn(false);
      this.isLoggedIn = this.authService.getIsLoggedIn();
      this.userData = null;
    }
  }

  onToggleNavbarMenu(): void {
    if (this.showNavbarMenu === 'hidden') {
      this.showNavbarMenu = 'sm:block';
      this.navbarMenuIcon = 'fa-x';
    } else {
      this.showNavbarMenu = 'hidden';
      this.navbarMenuIcon = 'fa-bars';
    }
  }

  onLogoutHandler(): void {
    if (this.userData !== null) {
      this.authService.logout(this.userData.accessToken);
      this.router.navigate(['']);
    }
  }
}
