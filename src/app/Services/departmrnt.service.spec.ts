import { TestBed } from '@angular/core/testing';

import { DepartmrntService } from './departmrnt.service';

describe('DepartmrntService', () => {
  let service: DepartmrntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmrntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
