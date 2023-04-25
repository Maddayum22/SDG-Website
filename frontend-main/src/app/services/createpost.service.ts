import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Post } from '../models/post';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class CreatepostService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public addPost(postObject: Post): Observable<Post> {
    const url = 'http://localhost:3000/posts/';
    return this.http.post<Post>(url, postObject).pipe();
  }

  public async getUserId(): Promise<Observable<number>> {
    const url = 'http://localhost:3000/sessions/';
    return this.http.get<number>(url, { withCredentials: true }).pipe();
  }
}
