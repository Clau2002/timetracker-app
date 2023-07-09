import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stage } from '../interfaces/stage.interface';
import { Observable, map } from 'rxjs';
import { TimeEntry } from '../interfaces/timeentry.interface';

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

  getProjectTime(id: number): Observable<string> {
    return this.http.get<string>(environment.userManagement.baseUrl + 'projects/getTotalTime/' + id);
  }

  getProjectTimeAsString(id: number): Observable<string> {
    const url = `${environment.userManagement.baseUrl}projects/getTotalTimeAsString/${id}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getProjectTimeWithoutDays(id: number): Observable<string> {
    return this.http.get<string>(environment.userManagement.baseUrl + 'projects/getTotalTimeWithoutDays/' + id);
  }

  getStageById(id: number) {
    return this.http.get<Stage>(environment.userManagement.baseUrl + 'stages/id/' + id);
  }

  createStage(stage: Stage) {
    return this.http.post(environment.userManagement.baseUrl + 'stages/createStage', stage);
  }

  createTimeEntry(timeEntry: TimeEntry) {
    return this.http.post(environment.userManagement.baseUrl + 'timeentries/create', timeEntry);
  }

  updateProject(project: Project) {
    return this.http.put(environment.userManagement.baseUrl + 'projects/update', project);
  }

  updateStage(stage: Stage) {
    return this.http.put(environment.userManagement.baseUrl + 'stages/update', stage);
  }

  updateStageStatus(stageId: number, status: string) {
    const url = `${environment.userManagement.baseUrl}stages/updateStatus/${stageId}`;
    const payload = { status: status };
    return this.http.put(url, payload);
  }

  getTimeEntriesByStageId(stageId: number): Observable<TimeEntry[]> {
    const url = `${environment.userManagement.baseUrl}timeentries/stageId/${stageId}`;
    return this.http.get<TimeEntry[]>(url);
  }

  getAllTimeEntriesByUserId() {
    const idLS = parseInt(localStorage.getItem("userId"));
    return this.http.get(environment.userManagement.baseUrl + 'timeentries/userId/' + idLS);
  }

  deleteProject(projectId: number): Observable<void> {
    const url = `${environment.userManagement.baseUrl}projects/delete/${projectId}`;
    return this.http.delete<void>(url);
  }
  
  deleteStage(stageId: number): Observable<void> {
    const url = `${environment.userManagement.baseUrl}stages/delete/${stageId}`;
    return this.http.delete<void>(url);
  }
  

  // updateStageStatus(stage:Stage){
  //   return this.http.put(environment.userManagement.baseUrl + 'stage', stage);
  // }
}
