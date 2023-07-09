import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EMPTY, switchMap } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { Stage } from 'src/app/interfaces/stage.interface';
import { TimeEntry } from 'src/app/interfaces/timeentry.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  counter: number;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';
  startTime: number;
  stopTime: number;
  elapsedMilliseconds: number = 0;
  startT: any;
  stopT: any;
  currentProject: Project;
  currentStageId: number;

  @Input() start: boolean;
  @Input() showTimerControls: boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    // this.createNewTimeEntry();
    const projectNameLC = localStorage.getItem('searchedProject');
    if (projectNameLC) {
      this.projectService.getProject(projectNameLC).subscribe((res) => {
        this.currentProject = res;
        for (const stage of res.stages) {
          if (stage.status !== 'Completed' && stage.status !== 'Canceled') {
            this.currentStageId = stage.id;
            break;
          }
        }
        localStorage.setItem('stageId', this.currentStageId.toString());
        console.log("STAGE_ID:" + this.currentStageId);
      });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'].currentValue) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    if (!this.running) {
      this.running = true;
      this.startText = 'Stop';
      this.startTime = Date.now() - this.elapsedMilliseconds;
      this.timerRef = setInterval(() => {
        this.elapsedMilliseconds = Date.now() - this.startTime;
        this.updateTimer();
      }, 1000);

      console.log('Start time:', this.formatTime(this.startTime));
      this.startT = this.formatTime(this.startTime);
    }
    else {
      this.running = false;
      this.startText = 'Start';
      clearInterval(this.timerRef);
      this.stopT = this.formatTime(Date.now());
      this.stopTime = Date.now() - this.elapsedMilliseconds; // Calculate stop time based on elapsed milliseconds
      console.log('Stop time:', this.formatTime(Date.now()));
      console.log('Elapsed time:', this.formatElapsedTime(this.elapsedMilliseconds));
      this.createNewTimeEntry();
    }
  }


  stopTimer() {
    if (this.running) {
      this.running = false;
      this.startText = 'Start';
      // this.stopTime = this.formatTime(Date.now());
      this.elapsedMilliseconds += Date.now() - this.startTime;
      clearInterval(this.timerRef);
      console.log('Stop time:', this.formatTime(this.stopTime));
      console.log('Elapsed time:', this.formatElapsedTime(this.elapsedMilliseconds));
    }
  }

  resetTimer() {
    // this.createNewTimeEntry();
    this.running = false;
    this.startText = 'Start';
    this.elapsedMilliseconds = 0;
    this.updateTimer();
    // this.createNewTimeEntry();
    clearInterval(this.timerRef);
  }

  updateTimer() {
    const totalSeconds = Math.floor(this.elapsedMilliseconds / 1000);
    this.hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    this.minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    this.seconds = (totalSeconds % 60).toString().padStart(2, '0');
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleString('en-US', { timeZone: 'Europe/Moscow' });
    return formattedTime;
  }

  formatElapsedTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  createNewTimeEntry() {
    const startTime = new Date(this.startT);
    const endTime = new Date(this.stopT);
    startTime.setHours(startTime.getHours() + 3);
    endTime.setHours(endTime.getHours() + 3);

    const timeEntry: TimeEntry = {
      stageId: this.currentStageId,
      startTime: startTime,
      endTime: endTime,
    };

    console.log('startTime:', timeEntry.startTime);
    console.log('endTime:', timeEntry.endTime);
    console.log("STAGE_ID_2:" + this.currentStageId);

    this.projectService.createTimeEntry(timeEntry).subscribe(
      (response) => {
        console.log('Time entry created:', response);
        // Reset the timer
        // this.resetTimer();
      },
      (error) => {
        console.error('Error creating time entry:', error);
      }
    );
  }
  // createNewTimeEntry() {
  //   const startTime = new Date(this.startTime);
  //   const endTime = new Date(this.stopT);
  //   // Adjust start and end times to GMT+3
  //   startTime.setHours(startTime.getHours() + 3);
  //   endTime.setHours(endTime.getHours() + 3);
  //   const projectNameLC = localStorage.getItem('searchedProject');

  //   if (projectNameLC) {
  //     this.projectService.getProject(projectNameLC).pipe(
  //       switchMap((project) => {
  //         if (project && project.stages) {
  //           const stages = project.stages;
  //           let stageId = null;

  //           // Find the first stage that is not canceled or completed
  //           for (const stage of stages) {
  //             if (stage.status !== 'Canceled' && stage.status !== 'Completed') {
  //               stageId = stage.id;
  //               break;
  //             }
  //           }
  //           if (stageId) {
  //             const timeEntry: TimeEntry = {
  //               stageId: stageId,
  //               startTime: startTime,
  //               endTime: endTime,
  //             };
  //             console.log('startTime:', timeEntry.startTime);
  //             console.log('endTime:', timeEntry.endTime);

  //             return this.projectService.createTimeEntry(timeEntry).pipe(
  //               switchMap(() => {
  //                 const updateStageData = { id: stageId, status: 'Active' };
  //                 return this.projectService.updateStage(updateStageData);
  //               })
  //             );
  //           } else {
  //             console.log('No stages available to create time entry.');
  //             return EMPTY; // No time entry to create, return an empty observable
  //           }
  //         } else {
  //           console.log('No project or stages found. No time entry created.');
  //           return EMPTY; // No project or stages found, return an empty observable
  //         }
  //       })
  //     ).subscribe(
  //       (response) => {
  //         console.log('Time entry created:', response);
  //         // Reset the timer
  //         // this.resetTimer();
  //       },
  //       (error) => {
  //         console.error('Error creating time entry:', error);
  //       }
  //     );
  //   }
  // }

}