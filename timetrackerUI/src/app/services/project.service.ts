import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stage } from '../interfaces/stage.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // project: Project = {};

  constructor(private http: HttpClient) { }

  getUserProjects() {
    return this.http.get(environment.userManagement.baseUrl + 'projects/userId/5');
  }

  createProject(project: Project) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.userManagement.baseUrl + 'projects/createProject', project);
  }

  getProject(projectName: string) {
    return this.http.get<Project>(environment.userManagement.baseUrl + 'projects/name/' + projectName);
  }

  createStage(stage: Stage) {
    return this.http.post(environment.userManagement.baseUrl + 'stages/createStage', stage);
  }

  // createProject(project: Project) {
  //   return this.http.post(environment.userManagement.baseUrl + 'projects/createProject', project);
  // }
}
