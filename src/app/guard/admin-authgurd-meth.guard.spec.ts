import { TestBed } from '@angular/core/testing';

import { AdminAuthgurdMethGuard } from './admin-authgurd-meth.guard';

describe('AdminAuthgurdMethGuard', () => {
  let guard: AdminAuthgurdMethGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthgurdMethGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
