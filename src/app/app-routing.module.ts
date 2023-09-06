import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './AuthComponent/login/login.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { UserDetailsComponent } from './Component/user-details/user-details.component';
import { BranchComponentComponent } from './Component/branch-component/branch-component.component';
import { DepartmentComponentComponent } from './Component/department-component/department-component.component';
import { DepartmentRoleComponentComponent } from './Component/department-role-component/department-role-component.component';
import { HomeComponent } from './Component/home/home.component';
import { AddEmployeeComponentComponent } from './Component/add-employee-component/add-employee-component.component';
import { AdminAuthgurdGuard } from './guard/admin-authgurd.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthguardGuard] },
  { path: '', component: HomeComponent, canActivate: [AdminAuthgurdGuard] },
  {
    path: 'addemployee',
    component: AddEmployeeComponentComponent,
    canActivate: [AdminAuthgurdGuard],
  },
  {
    path: 'userdetils',
    component: UserDetailsComponent,
  },
  {
    path: 'branchdetils',
    component: BranchComponentComponent,
    canActivate: [AdminAuthgurdGuard],
  },
  {
    path: 'departmrntdetils',
    component: DepartmentComponentComponent,
    canActivate: [AdminAuthgurdGuard],
  },
  {
    path: 'departmrntroledetils',
    component: DepartmentRoleComponentComponent,
    canActivate: [AdminAuthgurdGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
