import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  login_Active: boolean = false;
  login_Not_Active: boolean = true;
  Email: any;

  Home: any;
  ADDC: any;
  DR: any;
  D: any;
  B: any;
  currentRoute: any;
  decodedArray: any;
  dp: any;

  constructor(
    private loadingService: LoaderService,
    private route: Router,
    public login: LoginService,
    public AR: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      this.checkfiunction();
      this.getTye();
    });
    this.checkfiunction();
  }

  checkfiunction() {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != undefined
    ) {
      if (
        localStorage.getItem('emitToken') !== null &&
        localStorage.getItem('emitToken') !== undefined
      ) {
        this.dp = localStorage.getItem('emitToken');
        let decodedValue = atob(this.dp);
        this.decodedArray = JSON.parse(decodedValue);
      }
      this.Email = this.decodedArray.email;
      this.login_Active = true;
      this.login_Not_Active = false;
    } else {
      this.login_Not_Active = true;
      this.login_Active = false;
    }
  }

  getTye() {
    this.login.UserDetails(localStorage.getItem('token')).subscribe({
      next: (res) => {
        if (res.success && res.employee_Role === 'Admin') {
          this.Home = true;
          this.ADDC = true;
          this.DR = true;
          this.D = true;
          this.B = true;
        } else if (res.success && res.employee_Role === 'Head') {
          this.Home = true;
          this.ADDC = true;
          this.DR = false;
          this.D = false;
          this.B = false;
        } else {
          this.Home = false;
          this.ADDC = false;
          this.DR = false;
          this.D = false;
          this.B = false;
          // this.route.navigate(['/userdetils']);
        }
      },
    });
  }
}
