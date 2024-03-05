import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/sevices/auth/auth';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.css']
})
export class TranscriptComponent {
  @Input() studentList: User[] = [];
  formStudent = new FormGroup({
    id: new FormControl<number>(1),
    name: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
    sdt: new FormControl<string>(''),
    gender: new FormControl<string>(''),
    address: new FormControl<string>(''),
    class: new FormControl<string>(''),
  });
}
