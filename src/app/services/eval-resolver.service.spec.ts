import { TestBed } from '@angular/core/testing';

import { EvalResolverService } from './eval-resolver.service';

describe('EvalResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalResolverService = TestBed.get(EvalResolverService);
    expect(service).toBeTruthy();
  });
});
