import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  opened = true;
  userName?: string;

  constructor(userService: UserService, private authService: AuthService) {
    this.userName = authService.getUser().userName;
  }

  onClickProjects() {
    console.log("Projects clicked");
  }
}
