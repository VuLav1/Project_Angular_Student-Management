import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentTeacher().subscribe((teacherInfo) => {
      this.userInfo = teacherInfo;
      console.log(this.userInfo);
      
    });
  }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  logout() {
    this.authService.logout()
  }
}
