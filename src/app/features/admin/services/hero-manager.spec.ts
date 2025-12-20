import { TestBed } from '@angular/core/testing';

import { HeroManager } from './hero-manager';

describe('HeroManager', () => {
  let service: HeroManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
