import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCategoryListComponent } from './treatment-category-list.component';

describe('TreatmentCategoryListComponent', () => {
  let component: TreatmentCategoryListComponent;
  let fixture: ComponentFixture<TreatmentCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
