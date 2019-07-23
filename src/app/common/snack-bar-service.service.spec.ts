import { TestBed } from '@angular/core/testing';

import { SnackBarServiceService } from './snack-bar-service.service';

describe('SnackBarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackBarServiceService = TestBed.get(SnackBarServiceService);
    expect(service).toBeTruthy();
  });
});
