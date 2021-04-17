import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakTimeListComponent } from './break-time-list.component';

describe('BreakTimeListComponent', () => {
  let component: BreakTimeListComponent;
  let fixture: ComponentFixture<BreakTimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakTimeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
