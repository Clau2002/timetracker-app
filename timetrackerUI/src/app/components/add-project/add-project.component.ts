import { MatDatetimePickerInputEvent, NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription, switchMap } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


interface StageNames {
  value: string;
  viewValue: string;
}

// enum StageName {
//   ToDo = 'To Do',
//   Implementation = 'Implementation',
//   Done = 'Done'
// }

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  @ViewChild('picker') picker!: NgxMatDatetimePicker<any>;

  _userId?: number;
  _projectId?: number;
  searchedProject: Project = {};
  newStage: Stage = {};
  stages: Stage[] = [];
  newProjectName: string = "";
  showAddProjectForm: boolean = false;
  userDataSubscription: Subscription;
  selectedValue: string;
  // stageNames: StageNames[] = [
  //   { value: StageName.ToDo, viewValue: 'To Do' },
  //   { value: StageName.Implementation, viewValue: 'Implementation' },
  //   { value: StageName.Done, viewValue: 'Done' }
  // ];
  // stageName = '';
  stageDeadline = new FormControl();

  projectForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
    stageName: new FormControl(''),
    stageDeadline: new FormControl(''),
    stageDescription: new FormControl()
  });

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

  addProject() {
    if (this.authService.isLoggedIn()) {
      this.dialogRef.close();
      const formData = this.projectForm.value;
      const selectedDeadline = formData.stageDeadline;
      const localDeadline = moment(selectedDeadline).local().format();
      const stageData: Stage = {
        name: formData.stageName,
        deadline: localDeadline,
        description: formData.stageDescription,
        status: 'Inactive',
      }

      var stagesData: Array<Stage> = [stageData];

      const projectData: Project = {
        userId: this._userId,
        name: formData.projectName,
        description: formData.projectDescription,
        status: 'Inactive',
        stages: stagesData
      };
      // if(formData.stageName != '')
      //   projectData.stages.concat(stageData);
      this.projectService.createProject(projectData).subscribe();
      this._snackBar.open('Project added', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  getProjectByName(name: string) {
    return this.projectService.getProject(name).subscribe(
      (res: Project) => {
        this.searchedProject = res;
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

}