import { TestBed } from '@angular/core/testing';

import { GlobalLoaderService } from './global-loader.service';

describe('GlobalLoaderServiceService', () => {
  let service: GlobalLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
