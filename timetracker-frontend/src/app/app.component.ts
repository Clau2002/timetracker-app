import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projects: any;
  loggedIn = false;
  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
    // this.http.get('https://localhost:7119/api/projects/1005').subscribe({
    //   next: response => this.projects = response,
    //   error: error => console.log(error),
    //   complete: () => console.log('Request Completed')
    // });
  }

  loggedInBtn():void{
    this.loggedIn = true;
    console.log("loggedInBtn it s working");
  }

}
