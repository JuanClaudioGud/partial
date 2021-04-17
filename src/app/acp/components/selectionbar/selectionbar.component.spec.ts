import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionbarComponent } from './selectionbar.component';

describe('SelectionbarComponent', () => {
  let component: SelectionbarComponent;
  let fixture: ComponentFixture<SelectionbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
