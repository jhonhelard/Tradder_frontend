import { TestBed } from '@angular/core/testing';

import { TradierService } from './tradier.service';

describe('TradierService', () => {
  let service: TradierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
