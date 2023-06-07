import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';

export interface PeriodicElement {
  name: string;
  status: string;
  time: Time;
  stage: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'time', 'stage', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getUserProjects().subscribe(
      (projects: any[]) => {
        const elements: PeriodicElement[] = projects.map((project: any) => ({
          name: project.name,
          status: project.status,
          time: project.time,
          stage: project.stage
        }));
        this.dataSource.data = elements;
      },
      (error: any) => {
        console.log('Error retrieving projects:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createProject() {
    // Logic for creating a new project
    console.log('Create project button clicked');
  }
}
