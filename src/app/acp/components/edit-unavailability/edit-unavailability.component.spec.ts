import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnavailabilityComponent } from './edit-unavailability.component';

describe('EditUnavailabilityComponent', () => {
  let component: EditUnavailabilityComponent;
  let fixture: ComponentFixture<EditUnavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
