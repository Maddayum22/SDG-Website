/**
 * @author Sven Molenaar
 * Service that handles user logout requests by communicating with the backend API.
 * it exports the LogoutService class
 */
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class LogoutService extends BaseService{
/**
   * Creates an instance of the logoutService
   * @param http an http class that gets imported to make angular request possible
   */
  constructor (private http: HttpClient) {super();}

  /**
   * Sends a DELETE request to the logout endpoint of the backend with the user's header credentials.
   * @returns an Observable that gives the response from the backend in an User object
   */
  logout(
  ): Observable<User> {
    const url='http://localhost:3000/users/';
    return this.http.delete<User>(url,{withCredentials:true});
  }
}
