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
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   * @author Rowen Zaal
   * Constructor used to get the services, router & dialog.
   * @param getCookieService handles the cookie requests & responses with the backend.
   * @param logoutService handles the logout requests & responses with the backend.
   * @param loginService handles the login requests & responses with the backend.
   * @param router provides navigation among views and URL manipulation capabilities.
   * @param dialog service to open Material Design modal dialogs.
   */
  constructor(
    private getCookieService: GetCookieService,
    private logoutService: LogoutService,
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  
  /**
   * @author Rowen Zaal
   * Variables that get values when a certain action happens.
   */
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public userType: User | null | string = null;
  public user: User | null = null;
  public userId: User | null = null;

  /**
   * @author Rowen Zaal
   * This function fires on startup, checks if user is logged and/or admin.
   */
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

  /**
   * @author Rowen Zaal
   * This function get's the userId of the user.
   */
  private getUserId(): void {
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

  /**
   * @author Rowen Zaal
   * This function get's the usertype of the user using the userId.
   */
  private getUserType(): void {
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

  /**
   * @author Rowen Zaal
   * Function that handles the admin button in the header.
   */
  private adminCheck(): void {
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
       this.loginService.doStudent();
    }
  }

  /**
   * @author Sven Molenaar
   * creates an popup to indicate succes
   */
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

  /**
   * @author Sven Molenaar
   * creates an popup to indicate failure
   */
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

    /**
     * @author Sven Molenaar
     */
    public logout(): void {
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
  
    public getAccountId(): void {
      this.getCookieService.cookie().subscribe(
        (response: User | null) => {
          this.userId = response;
        },
        (error: unknown) => {
          console.log('No session found');
        }
      );
    }

    /**
     * @author Rowen Zaal
     * Popup for pages that are currently in development.
     */
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
}
