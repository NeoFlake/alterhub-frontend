import { TestBed } from '@angular/core/testing';

import { DeckListService } from './deck-list-service';

describe('DeckListService', () => {
  let service: DeckListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
