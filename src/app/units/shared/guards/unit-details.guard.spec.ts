import { TestBed } from '@angular/core/testing';

import { UnitDetailsGuard } from './unit-details.guard';

describe('GuardsGuard', () => {
  let guard: UnitDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnitDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
