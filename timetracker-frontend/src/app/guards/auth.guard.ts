import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toast: NgToastService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      this.toast.error({ detail: "ERROR", summary: "You are not logged in!", duration: 3000 });
      this.router.navigate(['login']);
      return false;
    }
  }

}
