import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  username?: string;
  newProjectName: string = "";
  showAddProjectForm: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.username = this.userService.user.username;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '530px',
      height: '530px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClickStart() {
    console.log("Start clicked");
  }
}
