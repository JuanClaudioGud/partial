import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnavailabilityComponent } from './add-unavailability.component';

describe('AddUnavailabilityComponent', () => {
  let component: AddUnavailabilityComponent;
  let fixture: ComponentFixture<AddUnavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
