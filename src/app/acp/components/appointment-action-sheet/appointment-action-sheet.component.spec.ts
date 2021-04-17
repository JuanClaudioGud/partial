import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentActionSheetComponent } from './appointment-action-sheet.component';

describe('AppointmentActionSheetComponent', () => {
  let component: AppointmentActionSheetComponent;
  let fixture: ComponentFixture<AppointmentActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
