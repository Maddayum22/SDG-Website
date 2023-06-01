import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {

  constructor(private http: HttpClient) {super();}

  register(
    registerObject: Object
  ): Observable<User> {
    const url='http://localhost:3000/users/';
    return this.http.post<User>(url,registerObject,{withCredentials:true})
    .pipe();
  }
}
