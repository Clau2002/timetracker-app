import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {};


  constructor(private http: HttpClient) { }

  getUser(userName: string) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    // return this.http.get(environment.userManagement.baseUrl + 'users/userName/' + userName);
    const endpoint = environment.userManagement.baseUrl + 'users/userName/' + userName;
    return this.http.get<User>(endpoint);
  }

  getUserByLocalStorage(): Observable<User> {
    const idLS = parseInt(localStorage.getItem("userId"));
    return this.http.get<User>(environment.userManagement.baseUrl + 'users/id/' + idLS);
  }

  getUserById(userId: number) {
    return this.http.get<User>(environment.userManagement.baseUrl + 'users/id/' + userId);
  }

  // getProjects() {
  //   return this.http.get(environment.userManagement + 'projects/userName/' + this.user.userName);
  // }
}
