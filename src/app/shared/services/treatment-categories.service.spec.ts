import { TestBed } from '@angular/core/testing';

import { TreatmentCategoriesService } from './treatment-categories.service';

describe('TreatmentCategoriesService', () => {
  let service: TreatmentCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
