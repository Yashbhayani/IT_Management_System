import { TestBed } from '@angular/core/testing';

import { DepartmrntRoleService } from './departmrnt-role.service';

describe('DepartmrntRoleService', () => {
  let service: DepartmrntRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmrntRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
