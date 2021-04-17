import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakTimesTableComponent } from './break-times-table.component';

describe('BreakTimesTableComponent', () => {
  let component: BreakTimesTableComponent;
  let fixture: ComponentFixture<BreakTimesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakTimesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakTimesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
