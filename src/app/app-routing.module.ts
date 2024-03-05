import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { StudentComponent } from './component/student/student.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { authGuard } from './sevices/auth/auth.guard';
import { TranscriptComponent } from './component/transcript/transcript.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '', component: HomeComponent, title: 'Home', canActivate: [authGuard] },
  { path: 'transcript', component: TranscriptComponent, title: 'Transcript', canActivate: [authGuard] },
  { path: 'list', component: StudentListComponent, title: 'Student List', canActivate: [authGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// json-server -w db.json