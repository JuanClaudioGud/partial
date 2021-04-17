import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCategoryDetailsComponent } from './treatment-category-details.component';

describe('TreatmentCategoryDetailsComponent', () => {
  let component: TreatmentCategoryDetailsComponent;
  let fixture: ComponentFixture<TreatmentCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
