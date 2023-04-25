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
  public userType: User | string = '';
  public user: User | null = null;
  public userId: unknown = null;

  ngOnInit() {
    this.loginService.isLoggedIn.subscribe({
      next: (v) => (this.loggedIn = v),
    });

    this.getCookieService.cookie().subscribe(
      (response: unknown) => {
        this.loggedIn = true;
        this.userId = response;
      },
      (error: unknown) => {
        console.log('No session found');
      }
    );
    this.getCookieService.usertype().subscribe(
      (response: User | string) => {
        this.userType = response;
      },
      (error: unknown) => {
        console.log('No user found');
      }
    );
  }

  logout() {
    this.logoutService.logout().subscribe(
      (response) => {
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
          this.loginService.doLogout();
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

  account() {
    this.getCookieService.cookie().subscribe(
      (response: unknown) => {
        this.userId = response;
      },
      (error: unknown) => {
        console.log('No session found');
      }
    );
  }
}
