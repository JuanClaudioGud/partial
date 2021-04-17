import { TestBed } from '@angular/core/testing';

import { PrefixInterceptor } from './prefix.interceptor';

describe('PrefixInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PrefixInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PrefixInterceptor = TestBed.inject(PrefixInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
