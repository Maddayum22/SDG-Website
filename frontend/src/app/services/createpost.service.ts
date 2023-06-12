import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class CreatepostService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * @author Madelief van Slooten
   * Sends a post to backend and returns a status if succes or not.
   * @param postObject Post object
   * @returns returns succes code if post is made.
   */
  public addPost(postObject: Post): Observable<Post> {
    const url = 'http://localhost:3000/posts/';
    return this.http.post<Post>(url, postObject).pipe();
  }

  /**
   * @author Madelief van Slooten
   * Gets the logged in user their id so the user can be bound to the post that is made.
   * NOTE: This can be removed if the getUserId from another service is used. This was not implemented because of time shortage.
   * @returns user Id
   */
  public async getUserId(): Promise<Observable<number>> {
    const url = 'http://localhost:3000/sessions/';
    return this.http.get<number>(url, { withCredentials: true }).pipe();
  }
}
