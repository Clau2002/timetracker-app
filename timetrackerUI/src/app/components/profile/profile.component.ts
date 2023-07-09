import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = { projects: [] };
  _userName?: string;
  profileForm: FormGroup;
  editMode = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) {
    // this._userName = userService.user.userName;
    //this.user = authService.getUser();
    // console.log(this.user.firstName);
  }

  ngOnInit(): void {
    this.displayUser();
    //console.log("user:" + this.userService.user.userName);
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  displayUser() {
    const idLS = parseInt(localStorage.getItem("userId"));
    this.userService.getUserByLocalStorage().subscribe((res: User) => {
      this.user = res;
      // Update the form values with user data
      this.profileForm.patchValue({
        username: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      });
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Get the updated form values
      const updatedUser: User = {
        id: this.user.id,
        userName: this.profileForm.value.username,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email
      };

      this.userService.updateUser(updatedUser).subscribe(() => {
        this.userService.updateUserName(updatedUser.userName); // Update the userName in AuthService
        this._snackBar.open('User updated successfully', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });

      // Call the updateUser() method of your UserService to update the user
      // this.userService.updateUser(updatedUser).subscribe(
      //   (response: User) => {
      //     // Update the user object with the response from the server
      //     this.user = response;
      //     console.log('User updated successfully:', this.user);
      //     // You can perform additional actions here, such as showing a success message or navigating to a different page.
      //   },
      //   (error: any) => {
      //     console.error('Error updating user:', error);
      //     // Handle the error appropriately, such as displaying an error message.
      //   }
      // );
    }
  }

  

  deleteAccount() {
    this.userService.deleteAccount().subscribe(
      () => {
        // User deleted successfully
        this.authService.logout(); // Log out the user
        this.router.navigate(['/auth']); // Navigate to the auth page
      },
      (error: HttpErrorResponse) => {
        // Handle the error appropriately
        console.error("Error deleting user:", error);
        // You can display an error message or perform any necessary actions
      }
    );
  }


  openDeleteAccountConfirmationDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DeleteAccountConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount();
        this.router.navigate(['/auth']);
      }
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any actions after the dialog is closed
    });
  }
}


@Component({
  selector: 'deleteAccount-confirmation-dialog',
  template: `
    <!-- <h2 mat-dialog-title>Logout Confirmation</h2> -->
    <mat-dialog-content style="font-weight: bold">
      Are you sure you want to delete your account?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `
})
export class DeleteAccountConfirmationDialogComponent { }
