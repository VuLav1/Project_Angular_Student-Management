import { Component } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project_Angular_CK';
  constructor(private authService: AuthService) { }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  logout() {
    this.authService.logout()
  }
}
