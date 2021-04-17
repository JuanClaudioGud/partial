import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkingDayComponent } from './edit-working-day.component';

describe('EditWorkingDayComponent', () => {
  let component: EditWorkingDayComponent;
  let fixture: ComponentFixture<EditWorkingDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkingDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
