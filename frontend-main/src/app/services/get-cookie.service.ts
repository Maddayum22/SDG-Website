import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class GetCookieService extends BaseService {
  constructor(private http: HttpClient) {super();}

  cookie(
  ): Observable<User> {
    const url='http://localhost:3000/sessions';
    return this.http.get<User>(url,{withCredentials:true})
    .pipe();
  }

  usertype(id: User | null
    ): Observable<User | string> {
      const url=`http://localhost:3000/users/${id}`;
      return this.http.get<User>(url,{withCredentials:true})
      .pipe();
    }
}
