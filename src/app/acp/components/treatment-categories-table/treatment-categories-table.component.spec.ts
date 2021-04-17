import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCategoriesTableComponent } from './treatment-categories-table.component';

describe('TreatmentCategoriesTableComponent', () => {
  let component: TreatmentCategoriesTableComponent;
  let fixture: ComponentFixture<TreatmentCategoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCategoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
