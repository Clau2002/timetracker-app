import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  opened = true;
  username?: string;

  constructor(userService: UserService) {
    this.username = userService.user.username;
  }

  onClickProjects() {
    console.log("Projects clicked");
  }
}
