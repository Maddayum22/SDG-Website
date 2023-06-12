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
  /**
   * @author Rowen Zaal
handles the cookie requests & responses with the backend.   * @param getCookieService 
   */
  constructor(private getCookieService: GetCookieService) {}

  public userId: User | null = null;
  public userType: User | string = '';

  /**
   * @author Rowen Zaal
   * This function get's the userId & usertype of an user from the backend.
   * @param route 
   * @returns if an user is authorized for a specific route.
   */
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
  
  /**
   * @author Rowen Zaal
   * This function get's the userId of the user.
   */
  private getUserId(): void {
    this.getCookieService.cookie().subscribe(
      (response: User) => {
        this.userId = response;
      },
      (error: unknown) => {
        console.log('No session found');
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
          }
        );
      }
    }, 100);
  }

  /**
   * @author Rowen Zaal
   * This function checks if an user is authorized.
   * @param route Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @returns true or false depending on the requested usertype.
   */
  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const userTypes = [this.userType];
      const expectedUserTypes = route.data['expectedUserTypes'];
      const userTypeMatch = userTypes.findIndex(
        (userType: any) => expectedUserTypes.indexOf(userType) !== -1
      );
      return userTypeMatch < 0 ? false : true;
  }
}
