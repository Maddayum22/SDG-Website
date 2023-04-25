/**
 * @author Sven Molenaar
 * Login Component Code
 * it exports the LoginComponent Class
 */
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   * defines the loginform, and its values
   */
  loginForm = this.formBuilder.group({
    emailAdress: '',
    password: '',
  });

  /**
   * Creates an instance of the loginService
   * @param loginService Service that provides methods to handle user login requests.
   * @param formBuilder formBuilder Class that gets imported to help with the construction of an Angular Form
   */
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * passwordClicked is defined false at start, but when the togglePassword function is called,
   * it switches the class of the password input to show the data
   */
  passwordClicked = false;
  togglePassword(): void {
    this.passwordClicked = !this.passwordClicked;
  }

  /**
   * Triggers when the login form is submitted.
   * it extracts the user's email address and password from the loginForm object, and stores this in an different loginObject,
   * and calls the login() method of the LoginService with this object as a parameter.
   * it subscribes to the login() method, which returns an observable that can give and succesfull or failed response.
   *
   * The successful response will be displayed in an succes pop-up and will redirect the user to the index page,
   * An failed response triggers an error callback, and will be displayed in an error pop-up
   */

  onSubmit(): void {
    let emailAdress = this.loginForm.value.emailAdress;
    let password = this.loginForm.value.password;
    let loginObject = { emailAdress, password };
    this.loginService.login(loginObject).subscribe(
      (response) => {
        let dialogRef = this.dialog.open(PopupComponent, {
          data: {
            message: 'Succesfully logged in',
            messageColor: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0, 138, 59)',
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
          this.loginService.doLogin();
          this.router.navigate(['/']);
        }, 1500);
      },
      (error) => {
        let dialogRef = this.dialog.open(PopupComponent, {
          data: {
            message: 'Wrong email or password!',
            messageColor: 'rgb(255,255,255)',
            backgroundColor: 'rgb(244, 67, 54)',
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
        }, 1500);
      }
    );
  }
}
