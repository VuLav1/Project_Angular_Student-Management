import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, User } from '../auth/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    this.getAllUserList().subscribe(res => {
      this.userList = res
    })
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
  getUserInfo(form: LoginForm) {
    for (let user of this.userList) {
      if (form.email == user.email && form.password == user.password) {
        this.userInfo= [
          user.name,
        ];
        this.currentTeacher = this.userInfo;
        return;
      }
    }
  }
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
