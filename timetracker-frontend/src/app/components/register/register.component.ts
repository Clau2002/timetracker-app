import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private account: AccountService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
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

  onRegister() {
    if (this.registerForm.valid) {
      this.account.register(this.registerForm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this.registerForm.reset();
          this.router.navigate(['/login']);
          this.toast.success({detail: "Register Successful", summary:res.message, duration: 3000});
        },
        error: (err:any) => {
          this.toast.error({detail: "ERROR", summary:"Username already exists", duration: 3000});
          console.log(err);
        }
      })
    }
    else {
      ValidateForm.validateAllFormFields(this.registerForm);
      this.toast.error({detail: "INVALID", summary:"Invalid Form", duration: 3000});
    }
  }
}
