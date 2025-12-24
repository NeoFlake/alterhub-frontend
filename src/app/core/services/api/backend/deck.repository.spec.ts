import { TestBed } from '@angular/core/testing';

import { DeckRepository } from './deck.repository';

describe('DeckRepository', () => {
  let service: DeckRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
