import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {};


  constructor(private http: HttpClient) { }

  getUser(username: string) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    // return this.http.get(environment.userManagement.baseUrl + 'users/username/' + username);
    const endpoint = environment.userManagement.baseUrl + 'users/username/' + username;
    return this.http.get<User>(endpoint);
  }

  getUserById(userId: number) {
    return this.http.get<User>(environment.userManagement.baseUrl + 'users/id/' + userId);
  }

  // getProjects() {
  //   return this.http.get(environment.userManagement + 'projects/username/' + this.user.username);
  // }
}
