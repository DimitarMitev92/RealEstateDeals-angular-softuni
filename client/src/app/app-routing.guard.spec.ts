import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { appRoutingGuard } from './app-routing.guard';

describe('appRoutingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => appRoutingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
