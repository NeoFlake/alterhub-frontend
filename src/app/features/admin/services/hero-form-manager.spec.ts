import { TestBed } from '@angular/core/testing';

import { HeroFormManager } from './hero-form-manager';

describe('HeroFormManager', () => {
  let service: HeroFormManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroFormManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
