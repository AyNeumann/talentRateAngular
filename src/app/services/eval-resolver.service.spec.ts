import { TestBed } from '@angular/core/testing';

import { EvalResolverService } from './eval-resolver.service';
import { HttpClientModule } from '@angular/common/http';

describe('EvalResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: EvalResolverService = TestBed.get(EvalResolverService);
    expect(service).toBeTruthy();
  });
});
