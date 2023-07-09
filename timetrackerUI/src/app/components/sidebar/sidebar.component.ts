import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  opened = true;
  userName?: string;
  userInitials?: string;

  constructor(userService: UserService, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    userService.userNameUpdated.subscribe((updatedUserName: string) => {
      this.userName = updatedUserName;
      this.userInitials = this.getInitials(updatedUserName);
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName");
    this.userInitials = this.getInitials(this.userName);
  }

  logout(): void {
    // Perform logout logic here, such as clearing user data or session
    this.authService.logout();
    // Navigate to the authentication page
    this.router.navigate(['/auth']);
  }

  getInitials(name: string): string {
    if (!name) {
      return "";
    }

    const names = name.split(' ');
    const initials = names.map(name => name.charAt(0)).join('');
    return initials.toUpperCase();
  }

  onClickProjects() {
    console.log("Projects clicked");
  }

  openLogoutConfirmationDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(LogoutConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
}

@Component({
  selector: 'logout-confirmation-dialog',
  template: `
    <!-- <h2 mat-dialog-title>Logout Confirmation</h2> -->
    <mat-dialog-content style="font-weight: bold">
      Are you sure you want to logout?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Logout</button>
    </mat-dialog-actions>
  `
})
export class LogoutConfirmationDialogComponent { }
