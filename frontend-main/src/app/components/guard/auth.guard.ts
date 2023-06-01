import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { GetCookieService } from 'src/app/services/get-cookie.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private getCookieService: GetCookieService) {}

  public userId: User | null = null;
  public userType: User | string = '';

  public canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.getUserId();
    this.getUserType();
    return this.isAuthorized(route);
  }
  
  private getUserId() {
    this.getCookieService.cookie().subscribe(
      (response: User) => {
        this.userId = response;
      },
      (error: unknown) => {
        console.log('No session found');
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
          }
        );
      }
    }, 100);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const userTypes = [this.userType];
      const expectedUserTypes = route.data['expectedUserTypes'];
      const userTypeMatch = userTypes.findIndex(
        (userType: any) => expectedUserTypes.indexOf(userType) !== -1
      );
      return userTypeMatch < 0 ? false : true;
  }
}
