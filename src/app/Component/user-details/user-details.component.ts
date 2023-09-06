import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/AuthServices/admin.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  UserData: any;
  constructor(
    private router: Router,
    public login: LoginService,
    public admin: AdminService
  ) {}
  Admin: boolean = false;
  Employee: boolean = false;
  ngOnInit() {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined ||
      localStorage.getItem('emitToken') === null ||
      localStorage.getItem('emitToken') === undefined
    ) {
      this.router.navigate(['/login']);
    }
    this.login.UserDetails(localStorage.getItem('token')).subscribe({
      next: (res) => {
        if (res.success && res.employee_Role === 'Admin') {
          this.UserData = res;
          this.Employee = false;
          this.Admin = true;
        } else {
          this.UserData = res;
          this.Employee = true;
          this.Admin = false;
        }
      },
    });
  }
}
