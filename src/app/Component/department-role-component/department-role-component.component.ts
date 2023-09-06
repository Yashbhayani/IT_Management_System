import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmrntRoleService } from 'src/app/Services/departmrnt-role.service';
import { DepartmrntService } from 'src/app/Services/departmrnt.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-department-role-component',
  templateUrl: './department-role-component.component.html',
  styleUrls: ['./department-role-component.component.css'],
})
export class DepartmentRoleComponentComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  DepartmrntRoleForm!: FormGroup;
  fname1: any;
  DepartmrntRoleData: any;
  DepartmrntData: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  ButtonName: string = 'Submit';
  DId: number = 0;
  BtColor: string = 'primary';
  Count: number = 0;
  IG: any;
  Active: boolean = false;
  Gender = [
    {
      id: 1,
      name: 'Head',
    },
    {
      id: 2,
      name: 'Employee',
    },
  ];
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private departmrntservicess: DepartmrntService,
    private departmentroleservicess: DepartmrntRoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined ||
      localStorage.getItem('emitToken') === null ||
      localStorage.getItem('emitToken') === undefined
    ) {
      this.router.navigate(['/login']);
    } else {
      this.loadingService.setLoading(true);
      this.getDepartmrnt();
      this.getDepartmrntrole();

      this.DepartmrntRoleForm = this.formBuilder.group({
        Departmentname: ['', Validators.required],
        Role: ['', Validators.required],
        EmployeeR: ['', Validators.required],
      });
    }
  }

  getDepartmrnt() {
    this.departmrntservicess
      .DepartmentDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.DepartmrntData = res.listdepartments;
          }
        },
        error: (er) => {},
      });
  }

  getDepartmrntrole() {
    this.departmentroleservicess
      .DepartmentRoleDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.DepartmrntRoleData = res.departmentRoleNewClasses;
            this.loadingService.setLoading(false);
          }
        },
        error: (er) => {},
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getDepartmrntrole();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDepartmrntrole();
  }

  Search() {
    if (this.fname1 != '') {
      let user = this.DepartmrntRoleData.filter((res: any) => {
        return (
          res.department
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.employeeRole
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase())
        );
      });
      this.DepartmrntRoleData = user;
    } else {
      this.getDepartmrntrole();
    }
  }

  AddChange(value: any) {
    if (value.target.value === 'Head') {
      this.Active = false;
    } else {
      this.Active = true;
    }
  }

  AddUpdateDepartmrntRoleData() {
    if (this.DId === 0) {
      if (this.DepartmrntRoleForm.value.Role === 'Head') {
        var IData = this.DepartmrntData.find(
          (x: { departmentName: any }) =>
            x.departmentName === this.DepartmrntRoleForm.value.Departmentname
        );
        this.data = {
          departmentId: IData.id,
          employeeRole: 'Head',
        };
      } else {
        var IData = this.DepartmrntData.find(
          (x: { departmentName: any }) =>
            x.departmentName === this.DepartmrntRoleForm.value.Departmentname
        );
        this.data = {
          departmentId: IData.id,
          employeeRole: this.DepartmrntRoleForm.value.EmployeeR,
        };
      }
      this.departmentroleservicess
        .AddDepartmentRole(this.data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.getDepartmrnt();
              this.getDepartmrntrole();
              this.DepartmrntRoleForm.reset();
              setTimeout(() => {
                this.AlertVal = true;
                this.Color = '';
                this.Message = '';
              }, 3500);
            } else {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'danger';
              this.Message = res.message;
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
    } else {
      if (this.DepartmrntRoleForm.value.Role === 'Head') {
        var IData = this.DepartmrntData.find(
          (x: { departmentName: any }) =>
            x.departmentName === this.DepartmrntRoleForm.value.Departmentname
        );
        this.data = {
          id: this.DId,
          departmentId: IData.id,
          employeeRole: 'Head',
        };
      } else {
        var IData = this.DepartmrntData.find(
          (x: { departmentName: any }) =>
            x.departmentName === this.DepartmrntRoleForm.value.Departmentname
        );
        this.data = {
          id: this.DId,
          departmentId: IData.id,
          employeeRole: this.DepartmrntRoleForm.value.EmployeeR,
        };
      }

      this.departmentroleservicess
        .UpdateDepartmentRole(this.data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.getDepartmrnt();
              this.getDepartmrntrole();
              this.DepartmrntRoleForm.reset();
              setTimeout(() => {
                this.AlertVal = true;
                this.Color = '';
                this.Message = '';
              }, 3500);
            } else {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'danger';
              this.Message = res.message;
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
      this.DId = 0;
      this.ButtonName = 'Submit';
      this.BtColor = 'primary';
    }
  }

  EditData(id: number) {
    var IData = this.DepartmrntRoleData.find((x: { id: any }) => x.id === id);
    if (IData.employeeRole !== 'Head') {
      this.DepartmrntRoleForm.controls['Departmentname'].setValue(
        IData.department
      );
      this.Active = true;
      this.DepartmrntRoleForm.controls['EmployeeR'].setValue(
        IData.employeeRole
      );
      this.DepartmrntRoleForm.controls['Role'].setValue('Employee');
    } else {
      this.DepartmrntRoleForm.controls['Departmentname'].setValue(
        IData.department
      );
      this.DepartmrntRoleForm.controls['Role'].setValue('Head');
    }

    this.DId = IData.id;
    this.ButtonName = 'Update';
    this.BtColor = 'warning';
  }
}
