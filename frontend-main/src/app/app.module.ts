//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

//components

import { CreatepostService } from './services/createpost.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProfileService } from './services/edit-profile.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { LoginComponent } from './components/login/login.component';
import { InformationComponent } from './components/information/information.component';
import { SdgListComponent } from './components/sdg-list/sdg-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { PopupComponent } from './components/popup/popup.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { AuthGuard } from './components/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { HomepageFeedComponent } from './components/homepage-feed/homepage-feed.component';
import { QuizBlockComponent } from './components/quiz-block/quiz-block.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    RegisterformComponent,
    LoginComponent,
    InformationComponent,
    SdgListComponent,
    AdminComponent,
    ContactComponent,
    QuizComponent,
    PopupComponent,
    CreatepostComponent,
    EditProfileComponent,
    HomeComponent,
    HomepageFeedComponent,
    QuizBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [PopupComponent],
  providers: [CreatepostService, EditProfileService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
