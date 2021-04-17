import { TestBed } from '@angular/core/testing';
import { BreakTimesService } from './break-times.service';

describe('BreakTimesService', () => {
  let service: BreakTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
