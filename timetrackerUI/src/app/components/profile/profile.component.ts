import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User={};
  _userName?: string;

  constructor(private userService: UserService, private authService: AuthService) {
    // this._userName = userService.user.userName;
    //this.user = authService.getUser();
    console.log(this.user.firstName);
  }

  ngOnInit(): void {
    this.displayUser();
    //console.log("user:" + this.userService.user.userName);
  }

  displayUser() {
    const idLS = parseInt(localStorage.getItem("userId"));
    this.userService.getUserByLocalStorage().subscribe((res: User) => {
      this.user = res;
      // this._userName = res.userName;
    });
    // console.log(this.user);
  }
}
