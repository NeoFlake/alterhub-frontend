import { TestBed } from '@angular/core/testing';

import { TypeRepository } from './type.repository';

describe('TypeRepository', () => {
  let service: TypeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
