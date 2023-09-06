import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../AuthServices/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthgurdGuard implements CanActivate {
  constructor(private router: Router, private service: AdminService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.AdminAndEmp()) {
      return true;
    } else {
      this.router.navigate(['/userdetils']);
      return false;
    }
  }
}
