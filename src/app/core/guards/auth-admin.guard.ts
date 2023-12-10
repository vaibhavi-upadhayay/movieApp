import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanLoad {
  canLoad() {
    let roleId = localStorage.getItem('roleId');

    if (roleId && roleId == '1') {
      return true;
    } else {
      return false;
    }
  }
}
