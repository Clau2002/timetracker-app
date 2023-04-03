import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl:string = 'https://localhost:7119/api/';

  constructor(private http:HttpClient) { }

  login(user: any){
    return this.http.post(this.baseUrl + 'account/login', user)
  }

  register(user: any){
    return this.http.post(this.baseUrl + 'account/register', user)
  }

  getUsers(usersList:any){
    return this.http.get(this.baseUrl + 'users', usersList)
  }
}
