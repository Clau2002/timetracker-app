import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("ok");
      if (this.isLoginMode) {
        this.authService.login(form.value).subscribe({
          next: (res: any) => {
            form.reset();
            console.log(res);
            this.authService.storeToken(res.token);
            this.userService.user.username = res.username;
            // const serilizedUser = JSON.stringify(this.userService.user.username);
            localStorage.setItem('username', this.userService.user.username);
            // this.userService.getProjects = res.projects;
            this._snackBar.open('Login Successful', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['sidebar']);
          },
          error: (err: any) => {
            console.log(form.value);
            console.log(err);
            this._snackBar.open('Login Failed', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        })
      }
      else {
        this.authService.register(form.value).subscribe({
          next: (res: any) => {
            form.reset();
            console.log(res);
            this.authService.storeToken(res.token);
            this.userService.user.id = res.id;
            this.userService.user.username = res.username;
            // this.userService.getProjects = res.projects;
            this._snackBar.open('Registration Successful', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['sidebar']);
          },
          error: (err: any) => {
            console.log(form.value);
            console.log(err);
            this._snackBar.open('Registration Failed', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        })
      }
    }
    else {
      this._snackBar.open('Please fill in all required fields', 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
