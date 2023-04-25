/**
 * @author Sven Molenaar
 * Service that handles user login requests by communicating with the backend API.
 * it exports the LoginService class
 */
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Creates an instance of the loginService
   * @param http an http class that gets imported to make angular request possible
   */
  constructor (private http: HttpClient) {super();}

  /**
   * Sends a POST request to the login endpoint of the backend with the user's email address and password as parameters.
   * @param loginObject an object which contains the user`s email and password input
   * @returns an Observable that gives the response from the backend in an User object
   */
  login(
    loginObject: object
  ): Observable<User> {
    const url='http://localhost:3000/sessions/';
    return this.http
      .post<User>(url,loginObject,{withCredentials:true})
      .pipe();
  }

  public get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: BehaviorSubject<boolean>) {
    this._isLoggedIn = value;
  }

  public doLogout() {
    this.isLoggedIn.next(false);
  }

  public doLogin() {
    this.isLoggedIn.next(true);
  }
}
