import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './AuthComponent/login/login.component';
import { UserDetailsComponent } from './Component/user-details/user-details.component';
import { HomeComponent } from './Component/home/home.component';
import { BranchComponentComponent } from './Component/branch-component/branch-component.component';
import { DepartmentComponentComponent } from './Component/department-component/department-component.component';
import { DepartmentRoleComponentComponent } from './Component/department-role-component/department-role-component.component';
import { AddEmployeeComponentComponent } from './Component/add-employee-component/add-employee-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
    LoginComponent,
    UserDetailsComponent,
    HomeComponent,
    BranchComponentComponent,
    DepartmentComponentComponent,
    DepartmentRoleComponentComponent,
    AddEmployeeComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
