/**
 * @author Sven Molenaar and Rowen Zaal
 */

import { Component, OnInit } from '@angular/core';
import { GetCookieService } from 'src/app/services/get-cookie.service';
import { LogoutService } from 'src/app/services/logout.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { EditProfileService } from '../../services/edit-profile.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private getCookieService: GetCookieService,
    private logoutService: LogoutService,
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public userType: User | null | string = null;
  public user: User | null = null;
  public userId: User | null = null;

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe({
      next: (v) => (this.loggedIn = v)
    });

    this.loginService.userType.subscribe({
      next: (v) => (this.isAdmin = v)
    });

    this.getUserId();
    this.getUserType();
  }

  private getUserId() {
    this.getCookieService.cookie().subscribe(
      (response: User) => {
        if (response === null) {
          console.log('No session found');
        }
        else {
          this.loggedIn = true;
          this.userId = response;
        }
      }
    );
  }

  private getUserType() {
    setTimeout(() => {
      if (this.userId === null) {
        console.log('No user found');
      } else {
        this.getCookieService.usertype(this.userId).subscribe(
          (response: User | string) => {
            const responseArray: Array<string> = Object.values(response.valueOf());
            this.userType = responseArray[0];
            this.adminCheck();
          }
        );
      }
    }, 100);
  }

  public logout() {
    this.logoutService.logout().subscribe(
      (response) => {
        this.succesPopup();
        setTimeout(() => {
          this.loginService.doLogout();
          this.userType = null;
          this.router.navigate(['/']);
        }, 1500);
      },
      (error) => {
        this.errorPopup();
      }
    );
  }

  public account() {
    this.getCookieService.cookie().subscribe(
      (response: User | null) => {
        this.userId = response;
      },
      (error: unknown) => {
        console.log('No session found');
      }
    );
  }

  private adminCheck(): void {
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
       this.loginService.doStudent();
    }
  }

  private succesPopup(): void {
    let dialogRef = this.dialog.open(PopupComponent, {
      data: {
        message: 'Succesfully logged out',
        messageColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0, 138, 59)',
      },
      panelClass: 'popup-container',
    });
    setTimeout(() => {
      dialogRef.close();
    }, 1500);
  }

  private errorPopup(): void {
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
}
