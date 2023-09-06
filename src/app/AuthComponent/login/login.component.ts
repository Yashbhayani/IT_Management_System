import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public login: LoginService
  ) {}
  hide: boolean = true;
  Color: string = '';
  AlertVal: boolean = true;
  Message: string = '';

  ngOnInit(): void {
    if (
      localStorage.getItem('token') == null ||
      localStorage.getItem('token') == undefined
    ) {
      this.LoginForm = this.formBuilder.group({
        Emial: ['', Validators.required],
        Password: ['', Validators.required],
      });
    } else {
      this.router.navigate(['/userdetils']);
    }
  }

  Shoandhide() {
    if (this.hide) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  Signin() {
    let data = {
      EmialId: this.LoginForm.value.Emial,
      password: this.LoginForm.value.Password,
    };

    this.login.LoginUserAdmin(data).subscribe({
      next: (res) => {
        if (res.success) {
          let data = {
            email: res.email,
            departmrnt: res.employee_Role,
            dr: res.departmentName,
          };
          const jsonString = JSON.stringify(data);
          let encodedValue = btoa(jsonString);
          localStorage.setItem('emitToken', encodedValue);
          localStorage.setItem('token', res.token);
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = 'Log in SuccessFully';
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
          this.LoginForm.reset();
          this.router.navigate(['']);
        } else {
          this.AlertVal = false;
          this.Color = 'warning';
          this.Message = 'Log in UnSuccessFull';
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      },
      error: (er) => {
        this.AlertVal = false;
        this.Color = 'warning';
        this.Message = er.message;
        setTimeout(() => {
          this.AlertVal = true;
          this.Color = '';
          this.Message = '';
        }, 3500);
      },
    });
  }
}
