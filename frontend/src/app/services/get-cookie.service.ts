import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class GetCookieService extends BaseService {
  /**
   * @author Rowen Zaal
   * @param http performs HTTP requests.
   */
  constructor(private http: HttpClient) {super();}

  /**
   * @author Rowen Zaal
   * @returns the userId of an user by checking the session.
   */
  public cookie(): Observable<User> {
    const url=`${this.apiUrl}/sessions`;
    return this.http.get<User>(url,{withCredentials:true}).pipe();
  }

  /**
   * @author Rowen Zaal
   * @returns the usertype of an user by checking the userId.
   */
  public usertype(id: User | null): Observable<User | string> {
    const url=`${this.apiUrl}/users/${id}/usertype`;
    return this.http.get<User>(url,{withCredentials:true}).pipe();
  }
}