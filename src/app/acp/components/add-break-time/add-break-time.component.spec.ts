import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreakTimeComponent } from './add-break-time.component';

describe('AddBreakTimeComponent', () => {
  let component: AddBreakTimeComponent;
  let fixture: ComponentFixture<AddBreakTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBreakTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBreakTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
