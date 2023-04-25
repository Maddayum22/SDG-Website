import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CreatepostService } from 'src/app/services/createpost.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @author Madelief van Slooten
 */

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  public userId: number = 0;
  constructor(
    private createPostService: CreatepostService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUserId();
  }

  createPostForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(300),
    ]),
    areaOfExpertise: new FormControl('', [Validators.required]),
    sdg: new FormControl('', [Validators.required]),
  });

  expertises = [
    'Choose Expertise',
    'Technology',
    'Business and Economics',
    'Applied Social Sciences and Law',
    'Digital Media and Creative Industries',
    'Education',
    'Health',
    'Sports and Nutrition',
  ];

  sdg = {
    'Choose SDG': 0,
    'No Poverty': 1,
    'Zero Hunger': 2,
    'Good Health and Wellbeing': 3,
    'Quality Education': 4,
    'Gender Equality': 5,
    'Clean Water and Sanitation': 6,
    'Affordable and Clean Energy': 7,
    'Decent Work and Economic Growth': 8,
    'Industry, Innovation and Infrastructure': 9,
    'Reduced Inequalities': 10,
    'Sustainable Cities and Communities': 11,
    'Responsible Consumption and Production': 12,
    'Climate Action': 13,
    'Life Below Water': 14,
    'Life on Land': 15,
    'Peace, Justice and Strong Institutions': 16,
    'Partnerships for the Goals': 17,
  };

  public getTitle(): string | null {
    return this.createPostForm.get('title')!.value;
  }

  public getDescription(): string | null {
    return this.createPostForm.get('description')!.value;
  }

  /**
   * Checks which id the selected sdg has and returns the sdg id.
   * @returns number sdgId
   */
  public getSdg() {
    let sdgValue = this.createPostForm.get('sdg')!.value;
    let sdgId = 0;
    for (const [key, value] of Object.entries(this.sdg)) {
      if (key === sdgValue) sdgId = value;
    }
    return sdgId;
  }

  public getExpertise(): string | null {
    return this.createPostForm.get('areaOfExpertise')!.value;
  }

  public async getUserId() {
    (await this.createPostService.getUserId()).subscribe((user) => {
      this.userId = user;
    });
  }

  /**
   * Sends post to backend and redirects user to home when created.
   * Popups are components that needed to be added like this.
   */
  public async createPost() {
    let postObject: Post = {
      title: this.getTitle()!,
      description: this.getDescription()!,
      sdgId: this.getSdg()!,
      areaOfExpertise: this.getExpertise()!,
      userId: this.userId,
    };
    this.createPostService.addPost(postObject).subscribe(
      () => {
        let dialogRef = this.dialog.open(PopupComponent, {
          data: {
            message: 'You made a post!',
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
            message: 'Something went wrong', 
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
