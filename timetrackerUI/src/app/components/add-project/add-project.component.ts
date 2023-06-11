import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';

import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  @ViewChild('picker') picker!: NgxMatDatetimePicker<any>;
  
  _userId?: number;
  newProject: Project = {};
  newStage: Stage = {};
  stages: Stage[] = [];
  newProjectName: string = "";
  showAddProjectForm: boolean = false;
  userDataSubscription : Subscription;

  constructor(public dialogRef: MatDialogRef<AddProjectComponent>,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const idLS = parseInt(localStorage.getItem("userId"));
    this.userDataSubscription = this.userService.getUserById(idLS).subscribe(
      user => {
        this._userId = user.id;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  addProject(newProject: Project) {
    if (this.authService.isLoggedIn()) {
      this.dialogRef.close(newProject);
      newProject.userId = this._userId;
      newProject.status = "Test status";
      this.projectService.createProject(newProject).subscribe();
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }
}