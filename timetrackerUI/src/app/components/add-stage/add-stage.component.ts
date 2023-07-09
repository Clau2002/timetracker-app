import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Stage } from 'src/app/interfaces/stage.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent implements OnInit {
  @ViewChild('picker') picker!: NgxMatDatetimePicker<any>;
  newStage: Stage = {};
  stageDeadline = new FormControl();
  projId: number;
  stageForm = new FormGroup({
    stageName: new FormControl(''),
    stageDeadline: new FormControl(''),
    stageDescription: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<AddStageComponent>,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.projId = Number(this.route.snapshot.params['projectId']);
  }

  addStage() {
    this.dialogRef.close();
    const projIdLC = parseInt(localStorage.getItem("projectId"));
    const formData = this.stageForm.value;
    const selectedDeadline = formData.stageDeadline;
    const localDeadline = moment(selectedDeadline).local().format();
    const stageData: Stage = {
      projectId: projIdLC,
      name: formData.stageName,
      deadline: localDeadline,
      description: formData.stageDescription,
      status: 'Inactive',
    }

    this.projectService.createStage(stageData).subscribe(() => {
      this._snackBar.open('Stage added', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // this.userDataSubscription.unsubscribe();
  }
}
