import { MatDatetimePickerInputEvent, NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';

import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


interface StageNames {
  value: string;
  viewValue: string;
}

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
  userDataSubscription: Subscription;
  selectedValue: string;
  stageNames: StageNames[] = [
    { value: '1', viewValue: 'To Do' },
    { value: '2', viewValue: 'Implementation' },
    { value: '3', viewValue: 'Done' }
  ];
  stageDeadline = new FormControl();
  private saveAsUTCValue: boolean = false;

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
      // Set the user ID and status for the new project
      newProject.userId = this._userId;
      newProject.status = "Test status";

      // Create the project
      this.projectService.createProject(newProject).subscribe(
        (createdProject: Project) => {
          // Create the stage for the new project
          const newStage: Stage = {
            projectId: createdProject.id,
            name: "Stage 3343",
            description: "stage works",
            status: "testing",
            deadline: moment(this.stageDeadline.value).utc(),
          };

          this.projectService.createStage(newStage).subscribe(
            (createdStage: Stage) => {
              // Stage created successfully
              console.log("Created stage: ", createdStage);

              // Close the dialog and show a success message
              this.dialogRef.close(createdProject);
              this._snackBar.open("Project added", "Close", {
                duration: 2000,
                horizontalPosition: "center",
                verticalPosition: "top",
              });
            },
            (error: any) => {
              // Error occurred while creating the stage
              console.error("Failed to create stage: ", error);
            }
          );
        },
        (error: any) => {
          // Error occurred while creating the project
          console.error("Failed to create project: ", error);
        }
      );
    }
  }



  // addProject(newProject: Project) {
  //   console.log(moment(this.stageDeadline.value).utc().format('YYYY-MM-DD HH:mm:ssZ'))
  // }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

}