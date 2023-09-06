import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchComponentComponent } from './branch-component.component';

describe('BranchComponentComponent', () => {
  let component: BranchComponentComponent;
  let fixture: ComponentFixture<BranchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
