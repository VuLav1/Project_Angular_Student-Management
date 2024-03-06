import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  constructor(private http: HttpClient) {
    this.getUserList().subscribe(res => {
      this.userList = res
    })
  }
  userList: User[] = []
  // AutoId() {
  //   var max = 1
  //   this.studentList.forEach(item => {
  //     if (item.id > max) {
  //       max = item.id
  //     }
  //   })
  //   return max + 1
  // }

  private baseURL = `http://localhost:3000/User`
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  // getStudentId(id: number): Student | undefined {
  //   return this.studentList.find(item => item.id == id)
  // }
  // searchId(id: number) {
  //   return this.studentList.find(item => item.id == id)
  // }
  // AddStudent(frmProduct: any) {
  //   return this.http.post(`${this.baseURL}`, frmProduct)
  // }
  // EditStudent(index: number) {
  //   return this.studentList[index]
  // }
  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`)
  }
  UpdateStudent(id: number, frmProduct: any, userID: number) {
    const newUserID = this.userList.findIndex(item => item.id == userID)
    const scoreID = this.userList[newUserID].score.findIndex(item => item.id == id)
    const name = this.userList[newUserID].score[scoreID].name
    this.userList[newUserID].score[scoreID] = frmProduct
    this.userList[newUserID].score[scoreID].id = frmProduct.id.toString()
    this.userList[newUserID].score[scoreID].name = name
    return this.http.put(`${this.baseURL}/${id}`, this.userList[newUserID])
    
    console.log(this.userList[newUserID]);

    // return this.userList[userID]
    // return this.http.put(`${this.baseURL}/${id}`, frmProduct)
  }
  // DeleteStudent(id: number) {
  //   return this.http.delete(`${this.baseURL}/${id}`)
  // }
}
