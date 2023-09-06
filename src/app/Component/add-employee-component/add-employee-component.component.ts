import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/Services/branch.service';
import { DepartmrntRoleService } from 'src/app/Services/departmrnt-role.service';
import { DepartmrntService } from 'src/app/Services/departmrnt.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-add-employee-component',
  templateUrl: './add-employee-component.component.html',
  styleUrls: ['./add-employee-component.component.css'],
})
export class AddEmployeeComponentComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  inputDate: any;
  EmployeeForm!: FormGroup;
  DepartmrntRoleData: any;
  DData: any;
  BranchData: any;
  Citydata: any;
  Statedata: any;
  Bdata: any;
  DDR: any;
  DDRR: any;
  DRole: any;

  ST: any;
  CI: any;
  BR: any;

  DID: any; //Departmrnt
  DRID: any; //Departmrnt Role
  BID: any; //Branch
  dp: any | null;
  decodedArray: any;

  SN: any = '';
  CN: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private departmrntservicess: DepartmrntService,
    private departmentroleservicess: DepartmrntRoleService,
    private branchservicess: BranchService,
    private employeeservice: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined
    ) {
      this.router.navigate(['/login']);
    } else {
      this.loadingService.setLoading(true);
      this.EmployeeForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        phone: ['', Validators.required],
        role: ['', Validators.required],
        department: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        branch: ['', Validators.required],
        joiningDate: ['', Validators.required],
        salary: [0, Validators.required],
      });
      this.getDepartmrnt();
      this.getDepartmrntrole();
      this.getBranch();
    }
  }
  getDepartmrnt() {
    this.departmrntservicess
      .DepartmentDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.DData = res.listdepartments;
            this.dp = localStorage.getItem('emitToken');
            let decodedValue = atob(this.dp);
            this.decodedArray = JSON.parse(decodedValue);
            if (this.decodedArray.department !== 'Admin') {
              var IData = this.DData.filter((res: any) => {
                return res.departmentName
                  .toLocaleLowerCase()
                  .match(this.decodedArray.dr.toLocaleLowerCase());
              });
              this.DData = IData;
            }
            this.loadingService.setLoading(false);
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

  getBranch() {
    this.branchservicess
      .BranchDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.BranchData = res.listbranch;
            this.Statedata = this.BranchData.filter(
              (obj: any, index: number) => {
                return (
                  index ===
                  this.BranchData.findIndex(
                    (o: { state: any }) => obj.state === o.state
                  )
                );
              }
            );
            this.loadingService.setLoading(false);
          }
        },
        error: (er) => {},
      });
  }

  AddChange(value: any) {
    var IData = this.DData.find(
      (x: { departmentName: any }) => x.departmentName === value.target.value
    );
    this.DID = IData.id;
    var IData = this.DepartmrntRoleData.filter((res: any) => {
      return res.department
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });
    this.DRole = IData;
  }

  AddRoleChange(value: any) {
    var IData = this.DepartmrntRoleData.find(
      (x: { employeeRole: any }) => x.employeeRole === value.target.value
    );
    this.DRID = IData.id;
  }

  AddSTChange(value: any) {
    var IData = this.BranchData.filter((res: any) => {
      return res.state
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });

    const ids: string[] = IData.map(({ city }: any) => city);
    this.Citydata = IData.filter(
      ({ city }: any, index: number) => !ids.includes(city, index + 1)
    );
  }

  AddCTChange(value: any) {
    this.Bdata = this.BranchData.filter((res: any) => {
      return res.city
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });
  }

  AddBRChange(value: any) {
    var IData = this.Bdata.find(
      (x: { branch: any }) => x.branch === value.target.value
    );
    this.BID = IData.id;
  }

  AddEmployeeData() {
    this.inputDate = new Date(this.EmployeeForm.value.joiningDate);
    const year = this.inputDate.getFullYear();
    const month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    let data = {
      id: 0,
      firstName: this.EmployeeForm.value.firstName,
      lastName: this.EmployeeForm.value.lastName,
      email: this.EmployeeForm.value.email,
      password: this.EmployeeForm.value.password,
      phone: this.EmployeeForm.value.phone,
      role: this.DID,
      department: this.DID,
      branch: this.BID,
      joiningDate: formattedDate,
      salary: this.EmployeeForm.value.salary,
    };

    this.employeeservice
      .AddEmployee(data, localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.AlertVal = false;
            this.Color = 'success';
            this.Message = res.message;
            this.loadingService.setLoading(false);
            this.EmployeeForm.reset();
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          } else {
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
  }
}
