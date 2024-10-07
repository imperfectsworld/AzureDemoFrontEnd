import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url:string =  environment.apiDomain;

  constructor(private http:HttpClient) { }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.url}api/Post`);
  }

  addPost(p:Post):Observable<Post>{
    return this.http.post<Post>(`${this.url}api/Post`, p);
  }

  addUser(u:User):Observable<User>{
    return this.http.post<User>(`${this.url}api/Users`, u);
  }

}
