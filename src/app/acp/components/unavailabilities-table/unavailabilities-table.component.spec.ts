import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailabilitiesTableComponent } from './unavailabilities-table.component';

describe('UnavailabilitiesTableComponent', () => {
  let component: UnavailabilitiesTableComponent;
  let fixture: ComponentFixture<UnavailabilitiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavailabilitiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailabilitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
