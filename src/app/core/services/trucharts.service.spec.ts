import { TestBed } from '@angular/core/testing';

import { TruchartsService } from './trucharts.service';

describe('TruchartsService', () => {
  let service: TruchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
