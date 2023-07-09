import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-stage',
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.css']
})
export class EditStageComponent {
  @ViewChild('picker') picker!: NgxMatDatetimePicker<any>;
  newStage: Stage = {};
  stageDeadline = new FormControl();
  projId: number;
  stageId: number;
  stageName: string;
  stageIdLC: string;
  stageForm = new FormGroup({
    stageName: new FormControl(''),
    stageDeadline: new FormControl(''),
    stageDescription: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<EditStageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stageId: number },
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.stageForm = this.formBuilder.group({
      stageName: ['', Validators.required],
      stageDeadline: ['', Validators.required],
      stageDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.stageId = this.data.stageId;
    this.stageIdLC = localStorage.getItem("stageId");
    this.stageId = parseInt(this.stageIdLC);
    this.displayStageData();
  }

  updateStage() {
    this.dialogRef.close();
    const projIdLC = parseInt(localStorage.getItem("projectId"));
    const formData = this.stageForm.value;
    const selectedDeadline = formData.stageDeadline;
    const localDeadline = moment(selectedDeadline).local().format();
    const stageData: Stage = {
      id: this.stageId,
      projectId: projIdLC,
      name: formData.stageName,
      deadline: localDeadline,
      description: formData.stageDescription,
      status: 'Inactive',
    }

    this.projectService.updateStage(stageData).subscribe(() => {
      this._snackBar.open('Stage updated successfully', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  displayStageData() {
    console.log("Stage ID: " + this.stageId);
    this.projectService.getStageById(this.stageId).subscribe((res: Stage) => {
      this.newStage = res;
      this.stageForm.patchValue({
        stageName: this.newStage.name,
        stageDescription: this.newStage.description,
        stageDeadline: this.newStage.deadline
      });
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
