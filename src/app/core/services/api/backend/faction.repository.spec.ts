import { TestBed } from '@angular/core/testing';

import { FactionRepository } from './faction.repository';

describe('FactionRepository', () => {
  let service: FactionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactionRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
