import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScoreService } from 'src/app/sevices/Score/score.service';
import { AuthService } from 'src/app/sevices/auth/auth.service';
import { UserService } from 'src/app/sevices/user/user.service';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.css']
})
export class TranscriptComponent {
  userInfo: any;
  currentUserID: number = 0;
  
  constructor(private authService: AuthService, private scoreService: ScoreService) { 

  }
  formStudent = new FormGroup({
    id: new FormControl<number>(1),
    kttk: new FormControl<number>(0),
    kt15: new FormControl<number>(0),
    ktgk: new FormControl<number>(0),
    ktck: new FormControl<number>(0),
  });

  ngOnInit(): void {
    this.authService.getCurrentTeacher().subscribe((teacherInfo) => {
      // this.userInfo = teacherInfo;
      this.currentUserID = teacherInfo.id;
      console.log(teacherInfo);
      
      
    });
    this.scoreService.getUser(this.currentUserID).subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log(userInfo);
      
    })
  }

  id: any;
  editScore(index: number){
    this.id = this.userInfo.score[index].id
    console.log(this.userInfo.score[index]);
    this.formStudent.controls['kttk'].setValue(this.userInfo.score[index].kttk)
    this.formStudent.controls['kt15'].setValue(this.userInfo.score[index].kt15)
    this.formStudent.controls['ktgk'].setValue(this.userInfo.score[index].ktgk)
    this.formStudent.controls['ktck'].setValue(this.userInfo.score[index].ktck)
  }
  IsAdd: Number = 1;
  IsUpdate: Number = 0;
  Update() {
    // this.scoreService.UpdateStudent(this.id, this.formStudent.value, this.userInfo.id)
    this.scoreService.UpdateStudent(this.id, this.formStudent.value, this.userInfo.id).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
}
