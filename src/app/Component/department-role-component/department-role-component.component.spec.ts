import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRoleComponentComponent } from './department-role-component.component';

describe('DepartmentRoleComponentComponent', () => {
  let component: DepartmentRoleComponentComponent;
  let fixture: ComponentFixture<DepartmentRoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentRoleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentRoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
