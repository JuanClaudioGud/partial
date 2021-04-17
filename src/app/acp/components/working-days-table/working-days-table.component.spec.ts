import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysTableComponent } from './working-days-table.component';

describe('WorkingDaysTableComponent', () => {
  let component: WorkingDaysTableComponent;
  let fixture: ComponentFixture<WorkingDaysTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDaysTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
