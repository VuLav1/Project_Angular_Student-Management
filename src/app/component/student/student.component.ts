import { Component, Input } from '@angular/core';
import { Student } from 'src/app/sevices/student/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() studentHome: Student[] = []

}
