import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { AddStageComponent } from '../add-stage/add-stage.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { EditStageComponent } from '../edit-stage/edit-stage.component';
import * as moment from 'moment';
import { Stage } from 'src/app/interfaces/stage.interface';
import { TimeEntry } from 'src/app/interfaces/timeentry.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  projectId: number;
  project: Project = {};
  userName?: string;
  projectTime: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.params['id']);
    localStorage.setItem("projectId", this.projectId.toString());
    this.getProject();
    this.getUserName();
    this.getProjectTime();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStageComponent, {
      width: '460px',
      height: '310px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshProject();
    });
  }

  getProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe((res) => {
      this.project = res;
      // this.updateStageStatusForProjects(this.project);
      console.log(this.project);
    });
  }

  getUserName(): void {
    this.userName = this.userService.user?.userName;
  }

  getProjectTime(): void {
    this.projectService.getProjectTimeAsString(this.projectId).subscribe((res) => {
      this.projectTime = res;
      console.log("TIME:" + this.projectTime);
    });
    // this.projectService.getProjectTime(this.projectId).subscribe((res) => {
    //   const totalTimeTracked: number = parseInt(res);
    //   this.projectTime = this.formatTime(totalTimeTracked);

    //   console.log("Total time tracked: " + this.projectTime);
    // });
  }


  calculateTimeEntrySum(timeEntries: TimeEntry[]): number {
    let sum: number = 0;
    timeEntries.forEach((timeEntry: TimeEntry) => {
      if (timeEntry.startTime && timeEntry.endTime) {
        const startTime: number = moment(timeEntry.startTime).valueOf();
        const endTime: number = moment(timeEntry.endTime).valueOf();
        const duration: number = endTime - startTime;
        sum += duration;
      }
    });
    return sum;
  }

  formatTime(time: number): string {
    const formattedTime: string = moment.utc(time).format('HH:mm:ss');
    return formattedTime;
  }





  // getProjectTime(): void {
  //   this.projectService.getProjectTime(this.projectId).subscribe((res) => {
  //     // const duration = moment.duration(res);
  //     // const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
  //     // this.projectTime = formattedTime;

  //     console.log("time:" + res);
  //   });

  // this.projectService.getProjectTime(this.projectId).subscribe((res) => {
  //   // this.projectTime = res;
  //   const input = res.toString();
  //   this.projectTime = input.replace(/(\d{2})(?=(\d{2})+$)/g, '$1:');

  //   console.log("time:" + this.projectTime);
  // });
  // }

  refreshProject(): void {
    this.getProject();
  }

  openEditProject(): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '460px',
      height: '310px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshProject();
    });
  }

  openEditStage(stageId): void {
    console.log("stageID: " + stageId);
    localStorage.setItem("stageId", stageId.toString());
    const dialogRef = this.dialog.open(EditStageComponent, {
      width: '460px',
      height: '310px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.refreshProject();
    });
  }

  finishStage(stage: Stage): void {
    stage.status = 'Completed';
    this.projectService.updateStage(stage).subscribe();
  }

  cancelStage(stage: Stage): void {
    stage.status = 'Canceled';
    this.projectService.updateStage(stage).subscribe();
  }

  activateStage(stage: Stage): void {
    stage.status = 'Active';
    this.projectService.updateStage(stage).subscribe();
  }

  deactivateStage(stage: Stage): void {
    stage.status = 'Inactive';
    this.projectService.updateStage(stage).subscribe();
  }

  deleteProject(): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(this.projectId).subscribe(() => {
        // Handle success response
        console.log('Project deleted successfully');
        this.router.navigate['/projects'];
        // Redirect to the project listing page or perform any other necessary action
      }, (error) => {
        // Handle error response
        console.error('Failed to delete project:', error);
        // Handle the error appropriately, such as displaying an error message to the user
      });
    }
  }

  deleteStage(stage: Stage): void {
    if (confirm('Are you sure you want to delete this stage?')) {
      this.projectService.deleteStage(stage.id).subscribe(() => {
        // Handle success response
        console.log('Stage deleted successfully');
        // Refresh the project details after deleting the stage
        this.refreshProject();
      }, (error) => {
        // Handle error response
        console.error('Failed to delete stage:', error);
        // Handle the error appropriately, such as displaying an error message to the user
      });
    }
  }


  // updateStageStatus(stage: Stage) {
  //   const apiUrl = `your-api-endpoint/${stage.id}`;
  //   this.http.put(apiUrl, stage).subscribe(
  //     (response) => {
  //       console.log('Stage status updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Failed to update stage status:', error);
  //     }
  //   );
  // }

  // updateStageStatusForProjects(project: Project): void {
  //   project.stages.forEach((stage: Stage) => {
  //     const timeEntrySum: number = this.calculateTimeEntrySum(stage.timeEntries);
  //     const stageDeadline: number = moment(stage.deadline).valueOf();

  //     if (timeEntrySum >= stageDeadline) {
  //       stage.status = 'completed';
  //     }
  //     console.log(timeEntrySum);
  //   });
  // }

  // calculateTimeEntrySum(timeEntries: TimeEntry[]): number {
  //   let sum: number = 0;
  //   timeEntries.forEach((timeEntry: TimeEntry) => {
  //     if (timeEntry.startTime && timeEntry.endTime) {
  //       const startTime: number = moment(timeEntry.startTime).valueOf();
  //       const endTime: number = moment(timeEntry.endTime).valueOf();
  //       const duration: number = endTime - startTime;
  //       sum += duration;
  //     }
  //   });
  //   return sum;
  // }
}
