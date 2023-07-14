import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userData: any = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

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

  onLogoutHandler() {
    if (this.userData !== null) {
      this.authService.logout(this.userData.accessToken);
    }
  }
}
