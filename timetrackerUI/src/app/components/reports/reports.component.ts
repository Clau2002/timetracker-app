import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/project.interface';
import { TimeEntry } from 'src/app/interfaces/timeentry.interface';
import * as moment from 'moment';

interface TimeData {
  intervalKey: string;
  value: number;
  unit: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  optionTimeUnit: string = '';
  chartData: ChartData = {
    datasets: [],
  };
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours Worked',
          color: 'blue'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: 'blue'
        }
      }
    }
  };
  selectedInterval: string = 'day'; // Default interval is set to 'day'
  timeEntries: TimeEntry[] = [];
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getTimeEntries();
    this.getProjects();
  }

  getTimeEntries(): void {
    this.projectService.getAllTimeEntriesByUserId().subscribe(
      (timeEntries: TimeEntry[]) => {
        this.timeEntries = timeEntries;
        this.updateChartData();
      },
      (error) => {
        console.log('Error retrieving time entries:', error);
      }
    );
  }

  getProjects(): void {
    this.projectService.getUserProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.log('Error retrieving projects:', error);
      }
    );
  }

  updateChartData(): void {
    const timeWorkedPerInterval = this.processTimeEntries(this.timeEntries, this.selectedInterval);

    const unitLabels = {
      seconds: 's',
      minutes: 'min',
      hours: 'h',
    };

    this.chartData.datasets = [
      {
        data: timeWorkedPerInterval.map(data => data.value),
        label: 'Time Worked per Interval',
        backgroundColor: '#7fa8b5',
        borderColor: '#7fa8b5',
        borderWidth: 0,
      },
    ];
    // this.chartLabels = timeWorkedPerInterval.map(data => data.intervalKey);
    this.chartLabels = this.sortChartLabels(timeWorkedPerInterval.map(data => data.intervalKey), this.selectedInterval);
    this.chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => {
              const unit = unitLabels[timeWorkedPerInterval[0].unit];
              return value % 1 === 0 ? value : value.toFixed(2) + ' ' + unit;
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw;
              const unit = unitLabels[timeWorkedPerInterval[0].unit];
              return `${value.toFixed(0)} ${unit}`;
            }
          }
        }
      }
    };
  }


  changeChartInterval(interval: string): void {
    this.selectedInterval = interval;
    this.updateChartData();
  }


  private processTimeEntries(timeEntries: TimeEntry[], interval: string): TimeData[] {
    // Logic to process the time entries based on the selected interval
    const timeWorkedPerInterval: TimeData[] = [];

    // Iterate through the time entries and calculate the time worked per interval
    timeEntries.forEach(entry => {
      const date = new Date(entry.startTime);

      let intervalKey;
      const localeOptions: Intl.DateTimeFormatOptions = {
        // year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZone: 'Europe/Bucharest' // Replace 'Europe/Bucharest' with your desired Eastern European time zone
      };

      switch (interval) {
        case 'day':
          intervalKey = date.toLocaleDateString('en-GB', localeOptions);
          break;
        case 'week':
          intervalKey = this.getWeekNumber(date);
          break;
        case 'month':
          intervalKey = date.toLocaleString('default', { month: 'long' });
          break;
        case 'year':
          intervalKey = date.getFullYear().toString();
          break;
        default:
          intervalKey = '';
          break;
      }

      let timeData = timeWorkedPerInterval.find(data => data.intervalKey === intervalKey);
      if (!timeData) {
        timeData = {
          intervalKey,
          value: 0,
          unit: 'hours'
        };
        timeWorkedPerInterval.push(timeData);
      }

      const startTime = new Date(entry.startTime).getTime();
      const endTime = new Date(entry.endTime).getTime();
      const durationMs = endTime - startTime;

      let hours: number;
      let unit: string;

      if (durationMs < 1000 * 60) {
        hours = durationMs / 1000;
        unit = 'seconds';
      } else if (durationMs < 1000 * 60 * 60) {
        hours = durationMs / (1000 * 60);
        unit = 'minutes';
      } else {
        hours = durationMs / (1000 * 60 * 60);
        unit = 'hours';
      }

      timeData.value += hours;
      timeData.unit = unit;
    });

    return timeWorkedPerInterval;
  }

  private sortChartLabels(labels: string[], interval: string): string[] {
    switch (interval) {
      case 'day':
        return labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      case 'week':
        return labels.sort((a, b) => {
          const weekA = parseInt(a.split(' ')[1]);
          const weekB = parseInt(b.split(' ')[1]);
          return weekA - weekB;
        });
      case 'month':
        return labels.sort((a, b) => {
          const dateA = moment(a, 'MMMM');
          const dateB = moment(b, 'MMMM');
          return dateA.diff(dateB);
        });
      case 'year':
        return labels.sort((a, b) => parseInt(a) - parseInt(b));
      default:
        return labels;
    }
  }

  private getWeekNumber(date: Date): string {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return `Week ${weekNumber}`;
  }
}
