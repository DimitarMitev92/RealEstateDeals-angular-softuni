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
      this.isLoggedIn = true;
      this.userData = JSON.parse(userDataString);
    } else {
      this.isLoggedIn = false;
      this.userData = null;
    }
  }

  onLogoutHandler() {
    if (this.userData !== null) {
      this.authService.logout(this.userData.accessToken);
    }
  }
}
