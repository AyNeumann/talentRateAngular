import { TestBed } from '@angular/core/testing';

import { LoaderServiceService } from './loader-service.service';

describe('LoaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderServiceService = TestBed.get(LoaderServiceService);
    expect(service).toBeTruthy();
  });
});
