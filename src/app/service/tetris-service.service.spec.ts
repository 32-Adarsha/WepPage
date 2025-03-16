import { TestBed } from '@angular/core/testing';

import { TetrisServiceService } from './tetris-service.service';

describe('TetrisServiceService', () => {
  let service: TetrisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
