import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectMockService } from 'src/app/services/project-mock.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  //projectMockService = inject(ProjectMockService);
  projectService = inject(ProjectService)
  project: Project = {};
  userName?: string;

  constructor(userService: UserService) {
    this.userName = userService.user.userName;
  }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.params['id']);
    this.projectService.getProjectById(projectId).subscribe(res => {
      this.project = res;
      console.log(this.project)
    }); 
  }
}
