import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7119/api/';
  username!: string;
  projects: any;

  constructor(private http:HttpClient) { }

  getProjects(){
    return this.http.get(this.baseUrl + 'projects/username/' + this.username);
  }
  

}
