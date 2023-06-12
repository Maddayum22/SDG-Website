import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  /**
   * @author Rowen Zaal
   * @param registerService handles the register requests & responses with the backend.
   * @param dialog Service to open Material Design modal dialogs.
   * @param router A service that provides navigation among views and URL manipulation capabilities.
   */
  constructor(
    private registerService: RegisterService,
    public dialog: MatDialog,
    private router: Router) { }

  /**
   * @author Rowen Zaal
   * Registerform including the validator checks for each field.
   */
  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\_-]+$")]),
      areaOfExpertise: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, [CustomValidators.MatchValidator('password', 'repeatPassword')]
  );

  /**
   * @author Rowen Zaal
   * Used to get the username field input.
   */
  public get username() {
    return this.registerForm.get('username');
  }

  /**
   * @author Rowen Zaal
   * Used to get the email field input.
   */
  public get email() {
    return this.registerForm.get('email');
  }

  /**
   * @author Rowen Zaal
   * Used to get the password field input.
   */
  public get password() {
    return this.registerForm.get('password');
  }

  /**
   * @author Rowen Zaal
   * Used to get the repeat password field input.
   */
  public get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  /**
   * @author Rowen Zaal
   * Used to get the password mismatch error.
   */
  public get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('repeatPassword')?.touched
    );
  }

  /**
   * @author Rowen Zaal
   * An array of the expertises
   */
  expertises = [
    'Choose',
    'Technology',
    'Business and Economics',
    'Applied Social Sciences and Law',
    'Digital Media and Creative Industries',
    'Education',
    'Health',
    'Sports and Nutrition'
  ];

  /**
   * @author Rowen Zaal
   * Variables that turn true when a certain action happens.
   */
  public passwordClicked = false;
  public repeatPasswordClicked = false;
  public registerSucces = false;
  public registerError = false;

  public togglePassword(): void {
    this.passwordClicked = !this.passwordClicked;
  }

  public toggleRepeatPassword(): void {
    this.repeatPasswordClicked = !this.repeatPasswordClicked;
  }

  /**
   * @author Rowen Zaal
   * On submit, the registerObject will be sent to the backend. The response is either a succes / error message.
   */
  public onSubmit(): void {
    const registerObject = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      emailAdress: this.registerForm.value.email,
      areaOfExpertise: this.registerForm.value.areaOfExpertise,
      userType: 'student'
    }
    this.registerService.register(registerObject)
      .subscribe(
        (response) => {
          let dialogRef = this.dialog.open(PopupComponent, {
            data: {
            message: 'Succesfully registerd your account',
            messageColor: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0, 138, 59)',
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
          this.router.navigate(['/']);
        }, 1500);
        },
        (error) => {
          let dialogRef = this.dialog.open(PopupComponent, {
            data: {
            message: 'Something went wrong, please try again',
            messageColor: 'rgb(255,255,255)', 
            backgroundColor: 'rgb(244, 67, 54)',
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
        }, 1500);
        }
        
      )
  }
  public ngOnInit(): void {}
}

export class CustomValidators {
  /**
   * @author Rowen Zaal
   * This function checks if the password & repeat password fields are identical.
   * @param source is the password field.
   * @param target is the repeat password field.
   */
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

