import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GetCookieService } from 'src/app/services/get-cookie.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private getCookieService: GetCookieService) {
    this.getUserType();
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  public userType: User | string = '';

  private getUserType(): void {
    this.getCookieService.usertype().subscribe(
      (response: User | string) => {
        this.userType = response;
      },
      (error: unknown) => {
        console.log('No user found');
      }
    );
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const userTypes = [this.userType];
    const expectedUserTypes = route.data['expectedUserTypes'];
    const userTypeMatch = userTypes.findIndex(
      (userType) => expectedUserTypes.indexOf(userType) !== -1
    );
    return userTypeMatch < 0 ? false : true;
  }
}
