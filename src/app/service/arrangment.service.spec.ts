import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { ArrangmentService } from './arrangment.service';

describe('ArrangmentService', () => {
  let service: ArrangmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrangmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
