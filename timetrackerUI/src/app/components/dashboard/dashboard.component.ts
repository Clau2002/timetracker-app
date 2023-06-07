import { Component, Inject } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { DialogService } from 'src/app/services/dialog.service';

// interface Project {
//   name: string;
//   username: string;
//   description: string;
//   status: string;
//   stage: string;
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  timer: any;
  seconds: number = 0;
  isRunning: boolean = false;

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000);
    this.isRunning = true;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.isRunning = false;
  }

  resetTimer() {
    this.seconds = 0;
    this.stopTimer();
  }
  username?: string;
  
  // projects: Project[] = [];
  newProjectName: string = "";
  showAddProjectForm: boolean = false;
  // newProject: Project = {
  //   userId: this.userService.user.id,
  //   name: '',
  //   description: '',
  //   projectStatus: 0,
  //   stages: []
  // };

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.username = this.userService.user.username;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClickStart() {
    console.log("Start clicked");
  }
}
