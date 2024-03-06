import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, User } from '../auth/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getAllUserList().subscribe(res => {
      this.userList = res
    })
  }
  ngOnInit(): void {
    this.authService.getCurrentTeacher().subscribe((teacherInfo) => {
      this.userInfo = teacherInfo;
      console.log(this.userInfo);
    });
  }
  protected userList: User[] = []
  AutoId() {
    var max = 1
    this.userList.forEach(item => {
      if (item.id > max) {
        max = item.id
      }
    })
    return max + 1
  }
  
  private baseURL = `http://localhost:3000/User`
  getAllUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }
  private currentTeacher: any = null;
  private userInfo: any
  getUsertId(id: number): User | undefined {
    return this.userList.find(item => item.id == id)
  }
  EditUser(index: number) {
    return this.userList[index]
  }
  UpdateUser(id: number, formUser: any): Observable<User[]> {
    return this.http.put<User[]>(`${this.baseURL}/${id}`, formUser)
  }
}
