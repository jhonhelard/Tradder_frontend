import { TestBed } from '@angular/core/testing';

import { LocalstorageHelper } from './localstorage.helper';

describe('LocalstorageHelperService', () => {
  let service: LocalstorageHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
