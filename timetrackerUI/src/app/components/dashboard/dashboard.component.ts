import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { UserService } from 'src/app/services/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectMockService } from 'src/app/services/project-mock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userName?: string;
  newProjectName: string = '';
  showAddProjectForm: boolean = false;
  projectList: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private projectMockTestService: ProjectMockService
  ) {
    // this.userName = this.userService.user.userName;
    this.projectList = this.projectMockTestService.getAllProjects();
    this.filteredProjects = this.projectList;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '530px',
      height: '530px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  filterProjects(name: string) {
    if (!name) {
      this.filteredProjects = this.projectList;
    }

    this.filteredProjects = this.projectList.filter((project) =>
      project.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  onClickStart() {
    console.log('Start clicked');
  }
}
