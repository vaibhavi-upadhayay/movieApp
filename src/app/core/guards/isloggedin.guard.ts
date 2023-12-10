import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let roleId = +(localStorage.getItem('roleId') || '');
    console.log('roleId', roleId);

    if (roleId == 1) {
      return this.router.parseUrl('/admin/dashboard');
    } else if (roleId == 2) {
      return this.router.parseUrl('/user/dashboard');
    } else {
      return true;
    }
  }
}
