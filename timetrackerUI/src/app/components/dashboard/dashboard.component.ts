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
  // timer: any;
  // seconds: number = 0;
  // isRunning: boolean = false;
  // startTimer() {
  //   this.timer = setInterval(() => {
  //     this.seconds++;
  //   }, 1000);
  //   this.isRunning = true;
  // }

  // stopTimer() {
  //   clearInterval(this.timer);
  //   this.isRunning = false;
  // }

  // resetTimer() {
  //   this.seconds = 0;
  //   this.stopTimer();
  // }

  clock: any;
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';


  @Input() start: boolean;
  @Input() showTimerControls: boolean;

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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else {
      this.clearTimer();
    }
  }

  counter: number;
  timerRef;
  running: boolean = false;
  startText = 'Start';

  startTimer() {
    // const source = timer(0, Date.now());
    // const subscribe = source.subscribe(val => console.log(val));
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      const timeFactor = 1;
      this.timerRef = setInterval(() => {
        this.counter = (Date.now() - startTime) * timeFactor;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.hours = Math.floor(this.counter / 3600000).toFixed(0);
        this.minutes = Math.floor(Math.floor(this.counter % 3600000) / 60000).toFixed(0);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.hours) < 10) {
          this.hours = '0' + this.hours;
        } else {
          this.hours = '' + this.hours;
        }
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.milliseconds = '00';
    this.seconds = '00';
    this.minutes = '00';
    this.hours = '00';
    clearInterval(this.timerRef);
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

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  ngOnInit() {
  }

  onClickStart() {
    console.log("Start clicked");
  }
}


