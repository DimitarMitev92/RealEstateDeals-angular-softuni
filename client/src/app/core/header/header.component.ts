import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData!: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userDataString = this.authService.getUserData();
    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
      console.log(this.userData);
    }
  }

  onLogoutHandler() {
    console.log(this.userData);
    this.authService.logout(this.userData.accessToken);
  }
}
