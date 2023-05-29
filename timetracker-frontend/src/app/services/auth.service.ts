import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(environment.userManagement.baseUrl + 'account/login', user)
  }

  register(user: any) {
    return this.http.post(environment.userManagement.baseUrl + 'account/register', user)
  }

  storeToken(tokenVal: string) {
    localStorage.setItem('token', tokenVal);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}