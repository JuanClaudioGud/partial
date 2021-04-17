import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsTableComponent } from './treatments-table.component';

describe('TreatmentsTableComponent', () => {
  let component: TreatmentsTableComponent;
  let fixture: ComponentFixture<TreatmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
