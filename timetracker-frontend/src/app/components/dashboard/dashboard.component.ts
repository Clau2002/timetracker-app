import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string;
  isCollapsed = false;
  projects: any;
  loggedIn = false;

  constructor(private userService: UserService) {
    this.username = this.userService.username;
    this.projects = this.userService.getProjects().subscribe({
      next: response => this.projects = response,
      error: error => console.log(error),
      complete: () => console.log('Request Completed')
      });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    console.log("Is workinggggg");
  }
  
}
