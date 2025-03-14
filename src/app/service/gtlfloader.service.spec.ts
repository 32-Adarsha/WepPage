import { TestBed } from '@angular/core/testing';

import { GtlfloaderService } from './gtlfloader.service';

describe('GtlfloaderService', () => {
  let service: GtlfloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtlfloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
