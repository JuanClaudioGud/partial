import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAppointmentStatusComponent } from './change-appointment-status.component';

describe('ChangeAppointmentStatusComponent', () => {
  let component: ChangeAppointmentStatusComponent;
  let fixture: ComponentFixture<ChangeAppointmentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAppointmentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAppointmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
