import { TestBed } from '@angular/core/testing';

import { HeroRepository } from './hero.repository';

describe('HeroRepository', () => {
  let service: HeroRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
