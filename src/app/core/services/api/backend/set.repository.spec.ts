import { TestBed } from '@angular/core/testing';

import { SetRepository } from './set.repository';

describe('SetRepository', () => {
  let service: SetRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
