import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor() { }

  ngOnInit(): void {
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

}