import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {EditProfileService} from "../../services/edit-profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User | null = null;

  public expertises: string[] = [
    'Choose Expertise',
    'Technology',
    'Business and Economics',
    'Applied Social Sciences and Law',
    'Digital Media and Creative Industries',
    'Education',
    'Health',
    'Sports and Nutrition'
  ];

  public constructor(
    private location: Location,
    private editProfileService: EditProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.getUserById();
  }

  public editUserProfileForm: FormGroup = new FormGroup({
    username: new FormControl(this.user?.username,
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    areaOfExpertise: new FormControl(this.user?.areaOfExpertise,
      [
        Validators.required
      ]),
    oldPassword: new FormControl('',
      []),
    newPassword: new FormControl('',
      []),
    repeatNewPassword: new FormControl('',
      []),
    email: new FormControl('',
      [
        Validators.required
      ]),
    education: new FormControl('',
      []),
    firstName: new FormControl('',
      []),
    lastName: new FormControl('',
      []),
    age: new FormControl('',
      []),
  });

  public title: number | undefined = this.editUserProfileForm?.get('username')?.value?.length;

  public submitUserProfileData(): void {
    const updatedUserDataObject = {
      username: this.editUserProfileForm.get('username')?.value,
      areaOfExpertise: this.editUserProfileForm.get('areaOfExpertise')?.value,
      emailAdress: this.editUserProfileForm.get('email')?.value,
      education: this.editUserProfileForm.get('education')?.value,
      firstName: this.editUserProfileForm.get('firstName')?.value,
      lastName: this.editUserProfileForm.get('lastName')?.value,
      age: this.editUserProfileForm.get('age')?.value,
    }
    const userId: number = this.activatedRoute.snapshot.paramMap.get('userId') as unknown as number;

      this.editProfileService.updateUserData(updatedUserDataObject, userId).subscribe(
        () => {
          let dialogRef = this.dialog.open(PopupComponent, {
            data: {
              message: 'Succesfully updated account details',
              messageColor: 'rgb(255,255,255)',
              backgroundColor: 'rgb(0, 138, 59)',
            },
            panelClass: 'popup-container',
          });
          setTimeout(() => {
            dialogRef.close();
            this.location.back();
          }, 4000);
        },
        (err) => {
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
          }, 2000);
        }
      );
  }

  public cancel(event: MouseEvent): void {
    event.preventDefault();
    this.location.back();
  }

  public developmentPopup(): void {
    let dialogRef = this.dialog.open(PopupComponent, {
      data: {
        message: "This page is currently in development, try again later",
        messageColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0, 174, 217)',
      },
      panelClass: 'popup-container',
    });
    setTimeout(() => {
      dialogRef.close();
    }, 1500);
  } 

  private async getUserById(): Promise<void> {
    const userId: number = this.activatedRoute.snapshot.paramMap.get('userId') as unknown as number;
    this.editProfileService.getUserById(userId).subscribe((user: User): void => {
      this.user = user;
      this.populateForm(user);
    });


  }

  private populateForm(user: User): void {
    this.editUserProfileForm.get('username')?.setValue(user?.username);
    this.editUserProfileForm.get('areaOfExpertise')?.setValue(user?.areaOfExpertise);
    this.editUserProfileForm.get('email')?.setValue(user?.emailAdress);
    this.editUserProfileForm.get('education')?.setValue(user?.education);
    this.editUserProfileForm.get('firstName')?.setValue(user?.firstName);
    this.editUserProfileForm.get('lastName')?.setValue(user?.lastName);
    this.editUserProfileForm.get('age')?.setValue(user?.age);
  }
}

