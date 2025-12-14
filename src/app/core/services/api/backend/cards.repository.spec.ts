import { TestBed } from '@angular/core/testing';

import { CardsRepository } from './cards.repository';

describe('CardsRepository', () => {
  let service: CardsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
