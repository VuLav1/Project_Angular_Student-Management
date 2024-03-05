import { Component } from '@angular/core';
import { LoginForm } from 'src/app/sevices/auth/auth';
import { AuthService } from 'src/app/sevices/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService) { }
  submit1() {
    this.authService.login(this.form)
  }
}
