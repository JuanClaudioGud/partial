import { TestBed } from '@angular/core/testing';
import { UnavailabilitiesService } from './unavailabilities.service';

describe('UnavailabilitiesService', () => {
  let service: UnavailabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnavailabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
