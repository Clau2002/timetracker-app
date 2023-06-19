import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectMockService {
  constructor() {}

  projects: Project[] = [
    {
      id: 0,
      userId: 5,
      name: 'Html project',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,to make a type specimen book.',
      status: 'Test',
      stages: [
        {
          id: 18,
          projectId: 52,
          name: '2',
          description: 'stage works finallyyyyyyyyy',
          status: 'testing',
          deadline: '2023-06-30T07:00:43',
        },
      ],
    },
    {
      id: 1,
      userId: 5,
      name: 'Java Script project',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,to make a type specimen book.',
      status: 'Test',
      stages: [
        {
          id: 19,
          projectId: 53,
          name: 'Implementation',
          description: 'la fel',
          status: 'testing',
          deadline: '2023-06-13T07:37:01.219',
        },
      ],
    },
    {
      id: 2,
      userId: 5,
      name: 'Python project',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,to make a type specimen book.',
      status: 'Test',
      stages: [
        {
          id: 19,
          projectId: 53,
          name: 'Implementation',
          description: 'la fel',
          status: 'testing',
          deadline: '2023-06-13T07:37:01.219',
        },
      ],
    },
    {
      id: 3,
      userId: 5,
      name: 'C++:  project',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,to make a type specimen book.',
      status: 'Test',
      stages: [
        {
          id: 19,
          projectId: 53,
          name: 'Implementation',
          description: 'la fel',
          status: 'testing',
          deadline: '2023-06-13T07:37:01.219',
        },
        {
          id: 22,
          projectId: 53,
          name: 'Next stage',
          description: 'la fel',
          status: 'testing',
          deadline: '2023-06-13T07:37:01.219',
        },
      ],
    },
  ];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }
}
