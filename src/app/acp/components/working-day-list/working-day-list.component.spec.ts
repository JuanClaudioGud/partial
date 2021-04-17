import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDayListComponent } from './working-day-list.component';

describe('WorkingDayListComponent', () => {
  let component: WorkingDayListComponent;
  let fixture: ComponentFixture<WorkingDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
