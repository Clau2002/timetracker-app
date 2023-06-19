import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(environment.userManagement.baseUrl + 'account/login', user);
  }

  register(user: User) {
    return this.http.post(environment.userManagement.baseUrl + 'account/register', user);
  }

  storeToken(tokenVal: string, userId: number) {
    localStorage.setItem('token', tokenVal);
    localStorage.setItem('userId', userId.toString());
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  storeProjects(projects: Project) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}