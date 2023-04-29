import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7119/api/';

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.baseUrl + 'account/login', user)
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'account/register', user)
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