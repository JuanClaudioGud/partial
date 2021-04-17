import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreatmentCategoryComponent } from './edit-treatment-category.component';

describe('EditTreatmentCategoryComponent', () => {
  let component: EditTreatmentCategoryComponent;
  let fixture: ComponentFixture<EditTreatmentCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTreatmentCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTreatmentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
