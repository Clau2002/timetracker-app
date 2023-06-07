import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  _userId?: number;
  public currentUser: User = {
  };

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
    name: '',
    description: '',
    projectStatus: 0,
    stages: []
  };

  newStage: Stage = {
    id: 0,
    projectId: 0,
    name: '',
    description: '',
    stageStatus: '',
    deadline: undefined
  };

  @ViewChild('projectForm') projectForm!: NgForm;

  async addProject(): Promise<void> {
    if (this.projectForm.valid) {
      if (this.authService.isLoggedIn()) {
        console.log("Form Submitted!");
        this.dialogRef.close(this.newProject);
        try {
          const res: any = await this.userService.getUser('tim').toPromise();
          this.userService.user.id = res.id;
          this.currentUser = res;
          console.log('Projects: ' + res.projects[3].name);
          this._userId = res.id;
          console.log('This is userId:' + this.userService.user.id);
          console.log('am luat userul: ' + this.currentUser.id);
          this._snackBar.open('User taken successfully', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          // Update currentUser with the retrieved user data
          this.currentUser = {
            id: res.id,
            username: res.username,
            password: '', // Exclude password for security reasons
            projects: res.projects
          };
        } catch (err) {
          console.log(err);
          this._snackBar.open('User not taken', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        this.resetForm();
        //const tokenVal = localStorage.getItem('token');

        // this.userService.getUser().subscribe({
        //   next: (res: any) => {
        //     console.log('res: ' + res);
        //     this.currentUser = res as User;
        //   },trap
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

        // this.projectService.createProject(this.newProject).subscribe({
        //   next: (res: any) => {
        //     console.log('mergeeeeeeee');
        //     // this.authService.storeToken(res.token);
        //     // this.projectService.project.userId = this.userService.user.id;
        //     // this.projectService.project.name = res.name;
        //     // this.projectService.project.description = '';
        //     // this.projectService.project.projectStatus = 0;
        //     // this.projectService.project.stages = [];
        //     this._snackBar.open('Project created successfully', 'Dismiss', {
        //       duration: 3000,
        //       horizontalPosition: 'center',
        //       verticalPosition: 'top',
        //     });
        //   },
        //   error: (err: any) => {
        //     console.log(err.error.message);
        //     this._snackBar.open('Error creating project', 'Dismiss', {
        //       duration: 3000,
        //       horizontalPosition: 'center',
        //       verticalPosition: 'top',
        //     });
        //   }
        // });
      }
      //console.log(this.newProject);
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