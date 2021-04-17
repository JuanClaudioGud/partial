import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreatmentCategoryComponent } from './add-treatment-category.component';

describe('AddTreatmentCategoryComponent', () => {
  let component: AddTreatmentCategoryComponent;
  let fixture: ComponentFixture<AddTreatmentCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTreatmentCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreatmentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
