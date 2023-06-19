import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stage } from '../interfaces/stage.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getUserProjects(): Observable<Project[]> {
    const idLS = parseInt(localStorage.getItem("userId"));
    return this.http.get<Project[]>(environment.userManagement.baseUrl + 'projects/userId/' + idLS);
  }

  createProject(project: Project) {
    return this.http.post(environment.userManagement.baseUrl + 'projects/createProject', project);
  }

  getProject(projectName: string) {
    return this.http.get<Project>(environment.userManagement.baseUrl + 'projects/name/' + projectName);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return this.http.get<Project>(environment.userManagement.baseUrl + 'projects/id/' + id);
  }

  createStage(stage: Stage) {
    return this.http.post(environment.userManagement.baseUrl + 'stages/createStage', stage);
  }
}
