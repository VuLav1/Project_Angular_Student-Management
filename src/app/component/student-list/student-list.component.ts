import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/app/sevices/student/student';
import { StudentService } from 'src/app/sevices/student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  @Input() studentList: Student[] = [];
  formStudent = new FormGroup({
    id: new FormControl<number>(1),
    name: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
    sdt: new FormControl<string>(''),
    gender: new FormControl<string>(''),
    address: new FormControl<string>(''),
    class: new FormControl<string>(''),
  });
  
  constructor(private prod: StudentService) {
    // prod.getAllStudentList().subscribe((data) => {
    //     this.studentList = data
    //   });
  }

  ngOnInit(): void {
    // this.formStudent.controls['studentID']
    this.prod.getAllStudentList().subscribe((data) => {
      this.studentList = data
    })
  }

  file: string = '';
  IsAdd: Number = 1;
  IsUpdate: Number = 0;
  Add() {
    // this.formStudent.controls['studentID']
    this.prod.AddStudent(this.formStudent.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
  id: any;
  Edit(index: number) {
    this.id = this.studentList[index].id
    this.formStudent.controls['name'].setValue(this.studentList[index].name)
    this.formStudent.controls['birthday'].setValue(this.studentList[index].birthday)
    this.formStudent.controls['sdt'].setValue(this.studentList[index].sdt)
    this.formStudent.controls['gender'].setValue(this.studentList[index].gender)
    this.formStudent.controls['address'].setValue(this.studentList[index].address)
    this.formStudent.controls['class'].setValue(this.studentList[index].class)
  }

  Update() {
    this.prod.UpdateStudent(this.id, this.formStudent.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
  Delete(index: number) {
    this.id = this.studentList[index].id
    this.prod.DeleteStudent(this.id).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }

}
