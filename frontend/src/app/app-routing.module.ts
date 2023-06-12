import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthGuard } from './components/guard/auth.guard';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { InformationComponent } from './components/information/information.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoggedInGuard } from './components/guard/loggedin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'users/:userId/account',
    component: EditProfileComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      expectedUserTypes: ['admin'],
    },
  },
  {
    path: 'post',
    component: CreatepostComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'quiz', component: QuizComponent, canActivate: [LoggedInGuard] },
  { path: 'sdginfo', component: InformationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
