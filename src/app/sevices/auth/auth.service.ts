import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm, RegisterForm, User } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isloading: boolean = false;
  private baseURL = `http://localhost:3000/User`;
  private currentTeacher: any = null;
  private userInfo: any;
  route: any;

  protected userList: User[] = []
  constructor(private router: Router, private http: HttpClient) {
    this.getAllUserList().subscribe((res: any) => {
      this.userList = res
    })
    this.route = router
  }
  getAllUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  login(form: LoginForm) {
    for (let user of this.userList) {
      if (form.email == user.email && form.password == user.password) {
        this.isAuthenticatedSubject.next(true);
        this.currentTeacherSubject.next(user);
        this.isAuthenticated = true;
        this.router.navigate(['']);
        this.currentTeacher = [
          user.name,
          user.email,
          user.class,
          user.subject,
          user.score
        ]
        // console.log(this.currentTeacher);
        return;
      }
    }
  }
  // Lấy thông tin giáo viên tại đây
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentTeacherSubject = new BehaviorSubject<any>(null);
  currentTeacher$ = this.currentTeacherSubject.asObservable();

  getisAuthenticated (): boolean {
    return this.isAuthenticatedSubject.value;
  }

  setCurrentTeacher(teacherInfo: any): void {
    this.currentTeacherSubject.next(teacherInfo);
  }
  getCurrentTeacher(): Observable<any> {
    return this.currentTeacher$;
  }
  //
  AutoId() {
    if (this.userList.length > 0)
      return this.userList[this.userList.length - 1].id + 1;
    else
      return 1;
  }

  logout() {
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }

  refreshData() {
    this.getAllUserList().subscribe((res: any) => {
      this.userList = res
    })
  }
  
}
