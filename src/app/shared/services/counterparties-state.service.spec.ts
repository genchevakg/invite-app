import { TestBed } from '@angular/core/testing';

import { CounterpartiesStateService } from './counterparties-state.service';

describe('CounterpartiesStateService', () => {
  let service: CounterpartiesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterpartiesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
