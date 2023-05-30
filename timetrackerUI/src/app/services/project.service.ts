import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // project: Project = {};

  constructor(private http: HttpClient) { }

  getUserProjects() {
    return this.http.get(environment.userManagement.baseUrl + 'projects/userId/' + localStorage.getItem('userId'));
  }

  createProject(project: Project) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.userManagement.baseUrl + 'projects/createProject', project);
  }

  // createProject(project: Project) {
  //   return this.http.post(environment.userManagement.baseUrl + 'projects/createProject', project);
  // }
}
