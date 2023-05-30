import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  status: string;
  time: Time;
  stage: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  displayedColumns: string[] = ['name', 'time', 'stage', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  projects: any[] = [
    {
      id: 1,
      name: 'Project 1',
      description: 'Description for Project 1',
      projectStatus: 'In Progress'
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'Description for Project 2',
      projectStatus: 'Completed'
    },
    {
      id: 3,
      name: 'Project 3',
      description: 'Description for Project 3',
      projectStatus: 'Pending'
    }
  ];

  createProject() {
    // Logic for creating a new project
    console.log('Create project button clicked');
  }
}
