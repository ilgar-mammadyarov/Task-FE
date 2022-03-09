import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  currentUser: any;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x === null) return;
      this.isAdmin = x.role === 'admin' ? true : false;
      this.isUser = x.role === '2' ? true : false;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
