import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad() {
    let roleId = localStorage.getItem('roleId');

    if (roleId) {
      if (roleId == '2') {
        return true;
      } else {
        return this.router.parseUrl('/page-not-found');
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
