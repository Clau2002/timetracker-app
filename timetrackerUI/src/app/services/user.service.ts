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

  getUser() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(environment.userManagement.baseUrl + 'users/username/' + this.user.username, { headers });
  }

  // getProjects() {
  //   return this.http.get(environment.userManagement + 'projects/username/' + this.user.username);
  // }
}
