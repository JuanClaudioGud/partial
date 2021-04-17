import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCategoriesComponent } from './treatment-categories.component';

describe('TreatmentCategoriesComponent', () => {
  let component: TreatmentCategoriesComponent;
  let fixture: ComponentFixture<TreatmentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
