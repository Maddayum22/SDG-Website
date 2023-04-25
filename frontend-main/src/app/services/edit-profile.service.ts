import {Injectable} from '@angular/core';
import {BaseService} from "./BaseService";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getUserById(userId: number): Observable<User> {
    const url: string = `${this.apiUrl}/user/${userId}`;
    return this.http.get<User>(url, {withCredentials: true}).pipe();
  }

  public updateUserData(user: User, userId: number): Observable<User> {
    const url: string = `${this.apiUrl}/user/account/edit/${userId}`;
    return this.http.put<User>(url, user, {withCredentials: true}).pipe();
  }
}
