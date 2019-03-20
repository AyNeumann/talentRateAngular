import { TestBed } from '@angular/core/testing';

import { EvalServiceService } from './eval-service.service';

describe('EvalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalServiceService = TestBed.get(EvalServiceService);
    expect(service).toBeTruthy();
  });
});
