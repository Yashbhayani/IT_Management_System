import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private router: Router) {}
  Userdata: any;
  IsLogin() {
    if (
      localStorage.getItem('token') !== null ||
      localStorage.getItem('token') !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  Loginfuncation() {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined
    ) {
      this.router.navigate(['/login']);
    }
  }

  UserFunction() {
    if (
      localStorage.getItem('token') !== null ||
      localStorage.getItem('token') !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

}
