import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take, tap } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectMockService } from 'src/app/services/project-mock.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectObs: Subscription = new Subscription();
  projectList: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    //private projectServiceMock: ProjectMockService
  ) {
    //this.projectList = this.projectServiceMock.getAllProjects();
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getUserProjects().subscribe((res) => {
      this.projectList = res;
    });
  }
}
