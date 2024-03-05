import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
    this.getAllStudentList().subscribe(res => {
      this.studentList = res
    })
  }
  protected studentList: Student[] = []
  AutoId() {
    var max = 1
    this.studentList.forEach(item => {
      if (item.id > max) {
        max = item.id
      }
    })
    return max + 1
  }

  private baseURL = `http://localhost:3000/student`
  getAllStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseURL}`)
  }
  getStudentId(id: number): Student | undefined {
    return this.studentList.find(item => item.id == id)
  }
  searchId(id: number) {
    return this.studentList.find(item => item.id == id)
  }
  AddStudent(frmProduct: any): Observable<Student[]> {
    return this.http.post<Student[]>(`${this.baseURL}`, frmProduct)
  }
  EditStudent(index: number) {
    return this.studentList[index]
  }
  UpdateStudent(id: number, frmProduct: any): Observable<Student[]> {
    return this.http.put<Student[]>(`${this.baseURL}/${id}`, frmProduct)
  }
  DeleteStudent(id: number): Observable<Student[]> {
    return this.http.delete<Student[]>(`${this.baseURL}/${id}`)
  }

}
