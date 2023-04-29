import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;

    if (this.isText) {
      this.type = "text";
      this.eyeIcon = "fa-eye";
    }
    else {
      this.type = "password";
      this.eyeIcon = "fa-eye-slash";
    }

  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.userService.username = res.username;
          this.userService.projects = res.projects;
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000 });
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 3000 });
          console.log(err);
        }
      })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toast.error({ detail: "INVALID", summary: "Invalid Form", duration: 3000 });
    }
  }
}