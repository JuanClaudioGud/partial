import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBreakTimeComponent } from './edit-break-time.component';

describe('EditBreakTimeComponent', () => {
  let component: EditBreakTimeComponent;
  let fixture: ComponentFixture<EditBreakTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBreakTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBreakTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
