import { Component } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username?: string;
  projects: Project[] = [];

  constructor(private userService: UserService) {
    this.username = this.userService.user.username;
    this.userService.getProjects().subscribe({
      next: response => this.projects = response,
      error: error => console.log(error),
      complete: () => console.log('Request Completed')
    });
  }

  onClickStart() {
    console.log("Start clicked");
  }
}
