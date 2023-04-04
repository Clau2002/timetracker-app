import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form';
import { AccountService } from 'src/app/services/account.service';

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

  constructor(private fb: FormBuilder, private account: AccountService, private router: Router, private toast: NgToastService) { }

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
      this.account.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.loginForm.reset();
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000 });
          this.router.navigate(['navbar']);
        },
        error: (err: any) => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 3000 });
          console.log(err);
        }
      })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toast.error({detail: "INVALID", summary:"Invalid Form", duration: 3000});
    }
  }
}