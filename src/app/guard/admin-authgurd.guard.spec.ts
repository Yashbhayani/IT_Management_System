import { TestBed } from '@angular/core/testing';

import { AdminAuthgurdGuard } from './admin-authgurd.guard';

describe('AdminAuthgurdGuard', () => {
  let guard: AdminAuthgurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthgurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
