import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BranchService } from 'src/app/Services/branch.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-branch-component',
  templateUrl: './branch-component.component.html',
  styleUrls: ['./branch-component.component.css'],
})
export class BranchComponentComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  BranchForm!: FormGroup;
  fname1: any;
  BranchData: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  ButtonName: string = 'Submit';
  BId: number = 0;
  BtColor: string = 'primary';
  constructor(
    private formBuilder: FormBuilder,
    private branchservicess: BranchService,
    private loadingService: LoaderService,
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
    this.getBranch();

    this.BranchForm = this.formBuilder.group({
      State: ['', Validators.required],
      City: ['', Validators.required],
      Branch: ['', Validators.required],
    });
  }
  }

  getBranch() {
    this.branchservicess
      .BranchDetails(localStorage.getItem('token'))
      .subscribe({
        next: (res) => {
          if (res.verify) {
            this.BranchData = res.listbranch;
            this.loadingService.setLoading(false);

          }
        },
        error: (er) => {},
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getBranch();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getBranch();
  }

  Search() {
    if (this.fname1 != '') {
      let user = this.BranchData.filter((res: any) => {
        return (
          res.state
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.city.toLocaleLowerCase().match(this.fname1.toLocaleLowerCase()) ||
          res.branch.toLocaleLowerCase().match(this.fname1.toLocaleLowerCase())
        );
      });
      this.BranchData = user;
    } else {
      this.getBranch();
    }
  }

  AddAndUpdateBranchData() {
    if (this.BId === 0) {
      var data = {
        id: 0,
        state: this.BranchForm.value.State,
        city: this.BranchForm.value.City,
        branch: this.BranchForm.value.Branch,
      };
      this.branchservicess
        .AddBranch(data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.getBranch();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.BranchForm.reset();
              setTimeout(() => {
                this.AlertVal = true;
                this.Color = '';
                this.Message = '';
              }, 3500);
            } else {
              this.getBranch();
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
        id: this.BId,
        state: this.BranchForm.value.State,
        city: this.BranchForm.value.City,
        branch: this.BranchForm.value.Branch,
      };
      this.branchservicess
        .UpdateBranch(data, localStorage.getItem('token'))
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.getBranch();
              this.AlertVal = false;
              this.Color = 'success';
              this.Message = res.message;
              this.BId = 0;
              this.BranchForm.reset();
              setTimeout(() => {
                this.AlertVal = true;
                this.Color = '';
                this.Message = '';
              }, 3500);
            } else {
              this.getBranch();
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
      this.BId = 0;
      this.ButtonName = 'Submit';
      this.BtColor = 'primary';
    }
  }

  EditData(id: any) {
    var IData = this.BranchData.find((x: { id: any }) => x.id === id);
    this.BId = IData.id;
    this.BranchForm.controls['State'].setValue(IData.state);
    this.BranchForm.controls['City'].setValue(IData.city);
    this.BranchForm.controls['Branch'].setValue(IData.branch);
    this.ButtonName = 'Update';
    this.BtColor = 'warning';
  }
}
