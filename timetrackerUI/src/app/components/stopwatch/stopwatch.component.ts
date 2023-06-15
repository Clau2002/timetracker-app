import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent {
  clock: any;
  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  counter: number;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';

  @Input() start: boolean;
  @Input() showTimerControls: boolean;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else {
      this.clearTimer();
    }
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      const timeFactor = 1;
      this.timerRef = setInterval(() => {
        this.counter = (Date.now() - startTime) * timeFactor;
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
    this.seconds = '00';
    this.minutes = '00';
    this.hours = '00';
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
