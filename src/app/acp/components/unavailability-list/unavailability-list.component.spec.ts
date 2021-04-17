import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailabilityListComponent } from './unavailability-list.component';

describe('UnavailabilityListComponent', () => {
  let component: UnavailabilityListComponent;
  let fixture: ComponentFixture<UnavailabilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavailabilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
