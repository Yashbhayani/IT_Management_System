import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { LoaderService } from '../Services/loader.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private loadingService: LoaderService,
    private router: Router,
    private login: LoginService
  ) {}
  res: any;
  dp: any;

  /*UserShow() {
    console.log('Yash');
    this.login.UserDetails(localStorage.getItem('token')).subscribe({
      next: (res) => {
        debugger;
        this.res = res;
        this.loadingService.setLoading(false);
        return true;
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
  }*/

  UseShow(): Observable<boolean> {
    return this.login.UserDetails(localStorage.getItem('token')).pipe(
      map((res) => {
        this.res = res;
        this.loadingService.setLoading(false);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  AdminAndEmp() {
    this.loadingService.setLoading(true);
    return this.UseShow();
  }

  AdminAuth() {
    this.loadingService.setLoading(true);
    return this.UseShow();
    /*
    if (this.res != undefined) {
      if (this.res.employee_Role == 'Admin') {
        this.loadingService.setLoading(false);
        return true;
      } else {
        this.loadingService.setLoading(false);
        return false;
      }
    } else {
      this.loadingService.setLoading(false);
      return false;
    }*/
  }
}
