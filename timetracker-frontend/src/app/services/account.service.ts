import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http:HttpClient) { }

  login(user: User){
    return this.http.post(environment.userManagement.baseUrl + 'account/login', user)
  }

  register(user: any){
    return this.http.post(environment.userManagement.baseUrl + 'account/register', user)
  }

  getUsers(usersList:any){
    return this.http.get(environment.userManagement.baseUrl + 'users', usersList)
  }
}
