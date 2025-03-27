import { TestBed } from '@angular/core/testing';

import { PopWindowService } from './pop-window.service';

describe('PopWindowService', () => {
  let service: PopWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
