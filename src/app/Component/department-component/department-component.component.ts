import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DepartmrntService } from 'src/app/Services/departmrnt.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-department-component',
  templateUrl: './department-component.component.html',
  styleUrls: ['./department-component.component.css'],
})
export class DepartmentComponentComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  DepartmrntForm!: FormGroup;
  fname1: any;
  DepartmrntData: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  ButtonName: string = 'Submit';
  DId: number = 0;
  BtColor: string = 'primary';

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private departmrntservicess: DepartmrntService,
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
      this.getDepartmrnt();
      this.DepartmrntForm = this.formBuilder.group({
        DepartmentName: ['', Validators.required],
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
            this.loadingService.setLoading(false);
          }
        },
        error: (er) => {},
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getDepartmrnt();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDepartmrnt();
  }

  Search() {
    if (this.fname1 != '') {
      let user = this.DepartmrntData.filter((res: any) => {
        return res.departmentName
          .toLocaleLowerCase()
          .match(this.fname1.toLocaleLowerCase());
      });
      this.DepartmrntData = user;
    } else {
      this.getDepartmrnt();
    }
  }

  AddAndUpdateDepartmrntData() {
    if (this.DId === 0) {
      var data = {
        id: 0,
        departmentName: this.DepartmrntForm.value.DepartmentName,
      };
      this.departmrntservicess
        .AddDepartment(data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.DepartmrntForm.reset();
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
            console.log(er);
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
      var data = {
        id: this.DId,
        departmentName: this.DepartmrntForm.value.DepartmentName,
      };
      this.departmrntservicess
        .UpdateDepartment(data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.getDepartmrnt();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.DId = 0;
              this.DepartmrntForm.reset();
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
            console.log(er);
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
    var IData = this.DepartmrntData.find((x: { id: any }) => x.id === id);
    this.DId = IData.id;
    this.DepartmrntForm.controls['DepartmentName'].setValue(
      IData.departmentName
    );
    this.ButtonName = 'Update';
    this.BtColor = 'warning';
  }
}
