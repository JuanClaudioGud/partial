import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailabilitiesComponent } from './unavailabilities.component';

describe('UnavailabilitiesComponent', () => {
  let component: UnavailabilitiesComponent;
  let fixture: ComponentFixture<UnavailabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavailabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
