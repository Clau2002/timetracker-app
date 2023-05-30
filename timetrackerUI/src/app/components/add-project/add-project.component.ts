import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  _userId?: number;
  currentUser: User = {};

  constructor(public dialogRef: MatDialogRef<AddProjectComponent>,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    // this._userId = this.userService.user.id;
  }

  newProjectName: string = "";
  showAddProjectForm: boolean = false;
  newProject: Project = {
    userId: 1005,
    name: 'Project 3',
    description: '',
    projectStatus: 0,
    stages: []
  };

  @ViewChild('projectForm') projectForm!: NgForm;

  addProject(): void {
    if (this.projectForm.valid) {
      if (this.authService.isLoggedIn()) {
        console.log("Form Submitted!");
        this.dialogRef.close(this.newProject);

        //const tokenVal = localStorage.getItem('token');

        // this.userService.getUser().subscribe({
        //   next: (res: any) => {
        //     console.log('res: ' + res);
        //     this.currentUser = res as User;
        //   },
        //   error: (err: any) => {
        //     console.log(err);
        //   }
        // });

        // console.log('currentUser: ' + this.currentUser);
        // console.log('userService: ' + this.userService.user);
        //this.newProject.userId = 1005;
        //this.newProject.name = this.projectForm.value.name;
        // console.log("This is userId: " + this.currentUser.id);
        // console.log("This is username: " + this.currentUser.username);

        this.projectService.createProject(this.newProject).subscribe({
          next: (res: any) => {
            console.log('mergeeeeeeee');
            // this.authService.storeToken(res.token);
            // this.projectService.project.userId = this.userService.user.id;
            // this.projectService.project.name = res.name;
            // this.projectService.project.description = '';
            // this.projectService.project.projectStatus = 0;
            // this.projectService.project.stages = [];
            this._snackBar.open('Project created successfully', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          error: (err: any) => {
            console.log(err.error.message);
            this._snackBar.open('Error creating project', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        });
      }
      //console.log(this.newProject);
      this.resetForm();
    }
    else {
      console.log("Form Invalid!");
    }
  }

  resetForm() {
    this.newProject = {
      name: '',
      // description: '',
      // projectStatus: 0,
      // stages: []
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }
}