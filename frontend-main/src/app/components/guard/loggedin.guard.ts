import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { GetCookieService } from 'src/app/services/get-cookie.service';
import { User } from 'src/app/models/user';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  private user: User | undefined;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: GetCookieService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.cookieService.cookie().pipe(
      mergeMap((cookie: User | undefined) => {
        if (cookie) {
          return of(true);
        } else {
          this.logInFirst();
          return of(false);
        }
      })
    );
  }

  private logInFirst() {
    let dialogRef = this.dialog.open(PopupComponent, {
      data: {
        message: 'You need to log in first!',
        messageColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0, 174, 217)',
      },
      panelClass: 'popup-container',
    });

    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/login']);
    }, 1500);
  }
}
