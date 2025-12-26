import { TestBed } from '@angular/core/testing';

import { DeckDetailService } from './deck-detail-service';

describe('DeckDetailService', () => {
  let service: DeckDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
