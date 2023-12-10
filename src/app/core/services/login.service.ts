import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // roleId will be 1 for Admin and 2 for common users.

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('roleId');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
