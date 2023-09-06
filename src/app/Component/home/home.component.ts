import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/Services/branch.service';
import { DepartmrntRoleService } from 'src/app/Services/departmrnt-role.service';
import { DepartmrntService } from 'src/app/Services/departmrnt.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  EditEmployeeForm!: FormGroup;
  FilterForm!: FormGroup;
  fname1: any;
  EmployeeData: any;
  DepartmrntRoleData: any;
  DepartmrntData: any;
  BranchData: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  ButtonName: string = 'Submit';
  EId: number = 0;
  BtColor: string = 'primary';
  Count: number = 0;
  inputDate: any;

  DData: any;
  Citydata: any;
  Statedata: any;
  Bdata: any;
  DDR: any;
  DDRR: any;
  DRole: any;

  NewDDR: any;
  NewDDRR: any;
  NewST: any;
  NewCI: any;
  NewBr: any;

  ST: any;
  CI: any;
  BR: any;

  DID: any; //Departmrnt
  DRID: any; //Departmrnt Role
  BID: any; //Branch

  UserData: any;
  UAC: any;

  dp: any;
  decodedArray: any;

  HEADDEPARTMRNT: any = null;

  //Patch
  NewDRole: any;
  NewDDATA: any;
  NewBranchData: any;
  NewStateData: any;
  NewCitydata: any;
  NewPatchBranchdata: any;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    public login: LoginService,
    private departmrntservicess: DepartmrntService,
    private departmentroleservicess: DepartmrntRoleService,
    private branchservicess: BranchService,
    private employeeservice: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    if (
      localStorage.getItem('emitToken') !== null &&
      localStorage.getItem('emitToken') !== undefined
    ) {
      this.dp = localStorage.getItem('emitToken');
      let decodedValue = atob(this.dp);
      const decodedArray = JSON.parse(decodedValue);
    } else {
      this.loadingService.setLoading(false);
      this.router.navigate(['/login']);
    }

    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined
    ) {
      this.router.navigate(['/login']);
    } else {
      this.loadingService.setLoading(true);
      this.getEmployeeData();
      this.getDepartmrnt();
      this.getDepartmrntrole();
      this.getBranch();
      this.getDetails();

      this.FilterForm = this.formBuilder.group({
        MinValue: [0],
        MaxValue: [0],
        DepartmentName: [],
        EmployeeRole: [],
        State: [],
        City: [],
        Branch: [],
        joiningDate: [],
      });

      this.EditEmployeeForm = this.formBuilder.group({
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
    }
  }

  //Get User Data
  getDetails() {
    this.loadingService.setLoading(true);
    this.login.UserDetails(localStorage.getItem('token')).subscribe({
      next: (res) => {
        if (res.success && res.employee_Role === 'Admin') {
          this.UserData = res;
          this.UAC = true;
          this.loadingService.setLoading(false);
        } else {
          this.UserData = res;
          if (res.employee_Role === 'Head') {
            this.HEADDEPARTMRNT = res.departmentName;
            this.AddpatchChange(this.HEADDEPARTMRNT);
          }
          this.UAC = false;
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  //Get Employee data
  getEmployeeData() {
    this.loadingService.setLoading(true);
    this.employeeservice
      .EmployeeDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          this.EmployeeData = res;
          this.loadingService.setLoading(false);
        },
        error: (er) => {
          console.log(er.message);
        },
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getEmployeeData();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEmployeeData();
  }

  //Search Data
  Search() {
    if (this.fname1 != '') {
      let user = this.EmployeeData.filter((res: any) => {
        return (
          res.firstName
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.lastName
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.email
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.password
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.phone
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.departmentName
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.employee_Role
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.state
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.city.toLocaleLowerCase().match(this.fname1.toLocaleLowerCase()) ||
          res.branch
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.joiningDate
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.salary
            .toString()
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase())
        );
      });
      this.EmployeeData = user;
    } else {
      this.getEmployeeData();
    }
  }

  //Edit Data Get and Set
  EditData(id: number) {
    const EditModel = document.getElementById('editModal');
    if (EditModel != null) {
      EditModel.style.display = 'block';
      let Data = this.EmployeeData.find((x: { id: any }) => x.id === id);
      this.EId = Data.id;
      this.inputDate = new Date(Data.joiningDate);
      this.EditEmployeeForm.controls['firstName'].setValue(Data.firstName);
      this.EditEmployeeForm.controls['lastName'].setValue(Data.lastName);
      this.EditEmployeeForm.controls['email'].setValue(Data.email);
      this.EditEmployeeForm.controls['password'].setValue(Data.password);
      this.EditEmployeeForm.controls['phone'].setValue(Data.phone);
      this.EditEmployeeForm.controls['department'].setValue(
        Data.departmentName
      );
      this.EditEmployeeForm.controls['joiningDate'].setValue(Data.joiningDate);
      this.EditEmployeeForm.controls['role'].setValue(Data.employee_Role);
      this.EditEmployeeForm.controls['salary'].setValue(Data.salary);
      this.EditEmployeeForm.controls['state'].setValue(Data.state);
      this.EditEmployeeForm.controls['city'].setValue(Data.city);
      this.EditEmployeeForm.controls['branch'].setValue(Data.branch);
      this.NewAddChange(Data.departmentName);
      this.NewAddRoleChange(Data.employee_Role);
      this.NewAddSTChange(Data.state);
      this.NewAddCTChange(Data.city);
      this.NewBRChange(Data.branch);
    }
  }

  //Model open and Close
  Closemodel() {
    this.EditEmployeeForm.reset();
    const EditModel = document.getElementById('editModal');
    if (EditModel != null) {
      EditModel.style.display = 'none';
      this.getEmployeeData();
    }
  }

  //get Departmrnt Data
  getDepartmrnt() {
    this.loadingService.setLoading(true);
    this.departmrntservicess
      .DepartmentDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.DData = res.listdepartments;
            this.NewDDATA = res.listdepartments;
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

  //Get DepartmentRole
  getDepartmrntrole() {
    this.loadingService.setLoading(true);
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

  //Get Branch with state and city
  getBranch() {
    this.loadingService.setLoading(true);
    this.branchservicess
      .BranchDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.BranchData = res.listbranch;
            this.NewBranchData = res.listbranch;
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
            this.NewStateData = this.Statedata;
            this.loadingService.setLoading(false);
          }
        },
        error: (er) => {},
      });
  }

  //Get Departmrnt and set Role Array
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

  NewAddChange(value: any) {
    var IData = this.DData.find(
      (x: { departmentName: any }) => x.departmentName === value
    );
    this.DID = IData.id;
    var IData = this.DepartmrntRoleData.filter((res: any) => {
      return res.department
        .toLocaleLowerCase()
        .match(value.toLocaleLowerCase());
    });
    this.DRole = IData;
  }

  //Get  EmployeeRole

  AddRoleChange(value: any) {
    var IData = this.DepartmrntRoleData.find(
      (x: { employeeRole: any }) => x.employeeRole === value.target.value
    );
    this.DRID = IData.id;
  }

  NewAddRoleChange(value: any) {
    var IData = this.DepartmrntRoleData.find(
      (x: { employeeRole: any }) => x.employeeRole === value
    );
    this.DRID = IData.id;
  }

  // State data get and City Array set

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

  NewAddSTChange(value: any) {
    var IData = this.BranchData.filter((res: any) => {
      return res.state.toLocaleLowerCase().match(value.toLocaleLowerCase());
    });
    const ids: string[] = IData.map(({ city }: any) => city);
    this.Citydata = IData.filter(
      ({ city }: any, index: number) => !ids.includes(city, index + 1)
    );
  }

  //City data get and Branch Array set
  AddCTChange(value: any) {
    this.Bdata = this.BranchData.filter((res: any) => {
      return res.city
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });
  }

  NewAddCTChange(value: any) {
    this.Bdata = this.BranchData.filter((res: any) => {
      return res.city.toLocaleLowerCase().match(value.toLocaleLowerCase());
    });
  }

  //Branch data get
  AddBRChange(value: any) {
    var IData = this.Bdata.find(
      (x: { branch: any }) => x.branch === value.target.value
    );
    this.BID = IData.id;
  }

  NewBRChange(value: any) {
    var IData = this.Bdata.find((x: { branch: any }) => x.branch === value);
    this.BID = IData.id;
  }

  //Update Data

  UpdateEmployeeData() {
    this.loadingService.setLoading(true);

    this.inputDate = new Date(this.EditEmployeeForm.value.joiningDate);
    const year = this.inputDate.getFullYear();
    const month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    let data = {
      id: this.EId,
      firstName: this.EditEmployeeForm.value.firstName,
      lastName: this.EditEmployeeForm.value.lastName,
      email: this.EditEmployeeForm.value.email,
      password: this.EditEmployeeForm.value.password,
      phone: this.EditEmployeeForm.value.phone,
      role: this.DRID,
      department: this.DID,
      branch: this.BID,
      joiningDate: formattedDate,
      salary: this.EditEmployeeForm.value.salary,
    };
    this.employeeservice
      .UpdateEmployee(data, localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.AlertVal = false;
            this.Color = 'success';
            this.Message = res.message;
            this.loadingService.setLoading(false);
            this.EditEmployeeForm.reset();
            this.inputDate = undefined;
            this.Closemodel();
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          } else {
            this.AlertVal = false;
            this.Color = 'danger';
            this.Message = res.message;
            this.loadingService.setLoading(false);
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
          this.loadingService.setLoading(false);

          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        },
      });
  }

  //Delete Data

  DeleteData(id: any) {
    this.employeeservice
      .DeleteEmployee(id, localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.getEmployeeData();
            this.AlertVal = false;
            this.Color = 'success';
            this.Message = res.message;
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          }
        },
        error: (er) => {
          console.log(er);
          this.getEmployeeData();
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = er.error.text;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        },
      });
  }

  // Patch

  PatchAddChange(value: any) {
    var IData = this.NewDDATA.find(
      (x: { departmentName: any }) => x.departmentName === value.target.value
    );
    var IData = this.DepartmrntRoleData.filter((res: any) => {
      return res.department
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });
    this.FilterForm.controls['EmployeeRole'].setValue('');

    // let DF = {
    //   department: 'Software Department',
    //   employeeRole: 'All',
    //   id: 1,
    // };
    this.NewDRole = IData;
    // this.NewDRole.unshift(DF);
  }

  AddpatchChange(value: any) {
    var IData = this.NewDDATA.find(
      (x: { departmentName: any }) => x.departmentName === value
    );
    var IData = this.DepartmrntRoleData.filter((res: any) => {
      return res.department
        .toLocaleLowerCase()
        .match(value.toLocaleLowerCase());
    });
    this.NewDRole = IData;
  }

  PatchAddRoleChange(value: any) {
    var IData = this.DepartmrntRoleData.find(
      (x: { employeeRole: any }) => x.employeeRole === value.target.value
    );
  }

  PatchNewAddState(value: any) {
    var IData = this.NewBranchData.filter((res: any) => {
      return res.state
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });

    const ids: string[] = IData.map(({ city }: any) => city);
    this.NewCitydata = IData.filter(
      ({ city }: any, index: number) => !ids.includes(city, index + 1)
    );
    this.NewPatchBranchdata = [];
  }

  PatchNewAddCity(value: any) {
    this.NewPatchBranchdata = this.NewBranchData.filter((res: any) => {
      return res.city
        .toLocaleLowerCase()
        .match(value.target.value.toLocaleLowerCase());
    });
  }

  Reset() {
    this.getEmployeeData();
    this.FilterForm.reset();
  }

  GetFilterData() {
    this.loadingService.setLoading(true);
    let date = '';

    if (this.FilterForm.value.joiningDate !== null) {
      this.inputDate = new Date(this.FilterForm.value.joiningDate);
      const year = this.inputDate.getFullYear();
      const month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.inputDate.getDate()).padStart(2, '0');
      date = `${year}-${month}-${day}`;
    }

    let data;

    if (this.HEADDEPARTMRNT !== null) {
      data = {
        minValue: Number(this.FilterForm.value.MinValue),
        maxValue: Number(this.FilterForm.value.MaxValue),
        departmentName: this.HEADDEPARTMRNT,
        employeeRole: this.FilterForm.value.EmployeeRole || '',
        state: this.FilterForm.value.State || '',
        city: this.FilterForm.value.City || '',
        branch: this.FilterForm.value.Branch || '',
        joiningDate: this.FilterForm.value.joiningDate === '' ? '' : date,
      };
    } else {
      data = {
        MinValue: Number(this.FilterForm.value.MinValue),
        MaxValue: Number(this.FilterForm.value.MaxValue),
        DepartmentName: this.FilterForm.value.DepartmentName || '',
        EmployeeRole: this.FilterForm.value.EmployeeRole || '',
        State: this.FilterForm.value.State || '',
        City: this.FilterForm.value.City || '',
        Branch: this.FilterForm.value.Branch || '',
        joiningDate: this.FilterForm.value.joiningDate === '' ? '' : date,
      };
    }

    console.log(data);
    this.employeeservice
      .PatchEmployee(data, localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          this.EmployeeData = res;
          this.loadingService.setLoading(false);
        },
        error: (er) => {
          this.loadingService.setLoading(false);
          console.log(er.error.text);
        },
      });
  }
}
