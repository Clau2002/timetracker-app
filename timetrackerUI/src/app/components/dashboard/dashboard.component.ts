import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { Stage } from 'src/app/interfaces/stage.interface';
import { TimeEntry } from 'src/app/interfaces/timeentry.interface';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName?: string;
  newProjectName: string = '';
  projectList: Project[] = [];
  filteredProjects: Project[] = [];
  searchedProject?: string;
  activeProject: Project;
  currentProject: Project;
  timeEntries: TimeEntry[] = [];
  currentStageId: number;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const storedProject = localStorage.getItem('searchedProject');
    const stageIdLS = parseInt(localStorage.getItem('stageId'));
    this.projectService.getUserProjects().subscribe((res) => {
      this.projectList = res;
      if (storedProject) {
        this.filterProjects(storedProject);
      }
    });

    this.projectService.getProject(storedProject).subscribe((res) => {
      this.currentProject = res;
      console.log(this.currentProject);
    });
    interval(1000).subscribe(() => {
      this.refreshData();
    });
    this.updateProjectStatus();
    interval(1000).subscribe(() => {
      this.refreshData();
    });
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
        console.log("STAGE_IDDD:" + this.currentStageId);
      });
    }

    interval(1000).subscribe(() => {
      this.refreshData();
    });

    this.filterProjects(storedProject);
    this.fetchTimeEntriesByStageId(stageIdLS);
  }

  calculateTimePassed(timeEntry: TimeEntry): string {
    const startTime = new Date(timeEntry.startTime).getTime();
    const endTime = new Date(timeEntry.endTime).getTime();
    const timePassed = endTime - startTime;

    const seconds = Math.floor((timePassed / 1000) % 60);
    const minutes = Math.floor((timePassed / (1000 * 60)) % 60);
    const hours = Math.floor(timePassed / (1000 * 60 * 60));

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  refreshData() {
    const storedProject = localStorage.getItem('searchedProject');
    const stageIdLS = parseInt(localStorage.getItem('stageId'));
    if (storedProject && stageIdLS) {

      this.projectService.getUserProjects().subscribe((res) => {
        this.projectList = res;
        this.filterProjects(storedProject);
      });

      this.projectService.getProject(storedProject).subscribe((res) => {
        this.currentProject = res;
      });

      this.updateProjectStatus();

      const projectNameLC = localStorage.getItem('searchedProject');
      if (projectNameLC) {
        this.projectService.getProject(projectNameLC).subscribe((res) => {
          this.currentProject = res;
        });
      }

      this.filterProjects(storedProject);
      this.fetchTimeEntriesByStageId(stageIdLS);
    }
  }

  updateProjectStatus() {
    const searchedProjectName = localStorage.getItem('searchedProject');
    console.log("lalalal");
    if (searchedProjectName) {
      this.projectService.getProject(searchedProjectName).subscribe((res) => {
        this.activeProject = res;
        localStorage.setItem('activeProject', JSON.stringify(this.activeProject));

        if (this.activeProject) {
          const currentProject: Project = {
            id: this.activeProject.id,
            name: this.activeProject.name,
            description: this.activeProject.description,
            status: 'Active',
            stages: this.activeProject.stages,
          };

          let activeStageId: number | null = null; 

          projectLoop: for (const project of this.projectList) {
            for (const stage of project.stages) {
              if (stage.status === 'Inactive') {
                activeStageId = stage.id;
                break projectLoop; // Exit both loops
              }
            }
          }
          this.projectList.forEach((project) => {
            if (project.id === currentProject.id) {
              // Set the status of the current project to 'Active'
              project.status = currentProject.status;
              project.stages = currentProject.stages;
            } else if (project.status !== 'Completed' && project.status !== 'Canceled') {
              // Set the status of other projects to 'Inactive'
              project.status = 'Inactive';
              project.stages.forEach((stage) => {
                if (stage.status !== 'Completed' && stage.status !== 'Canceled')
                  stage.status = 'Inactive';
              });
            }
            // Update the project
            this.projectService.updateProject(project).subscribe();
          });

          // Update the status of the active stage to 'Active'
          const stgIdLS = parseInt(localStorage.getItem('stageId'));
          if (stgIdLS) {
            console.log("activeStageId:" + activeStageId);
            console.log("stgIdLS:" + stgIdLS);
            this.projectService.getStageById(stgIdLS).subscribe((stage) => {
              // stage.status = 'Active';
              const tmpStage: Stage = {
                id: stage.id,
                projectId: stage.projectId,
                name: stage.name,
                description: stage.description,
                deadline: stage.deadline,
                status: 'Active'
              }
              this.projectService.updateStage(tmpStage).subscribe(() => {
                console.log('Stage status updated to Active' + tmpStage);
              });
            });
          }
        }
      });
    }
  }

  fetchTimeEntriesByStageId(stageId: number): void {
    this.projectService.getTimeEntriesByStageId(stageId).subscribe(
      (timeEntries: TimeEntry[]) => {
        this.timeEntries = timeEntries;
      },
      (error) => {
        console.log('Error fetching time entries:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '530px',
      height: '530px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  filterProjects(name: string) {
    this.searchedProject = name.trim();
    if (this.searchedProject === '') {
      this.filteredProjects = [];
    } else {
      this.filteredProjects = this.projectList.filter((project) =>
        project.name.toLowerCase().includes(this.searchedProject.toLowerCase())
      );
    }

    localStorage.setItem('searchedProject', this.searchedProject);
  }

  calculateProgress(project: Project): number {
    if (!project || !project.stages || project.stages.length === 0) {
      return 0;
    }

    const completedStages = project.stages.filter(
      (stage) => stage.status === 'Completed'
    );
    const progress = (completedStages.length / project.stages.length) * 100;
    return Math.round(progress);
  }

  onClickStart() {
    console.log('Start clicked');
  }
}
