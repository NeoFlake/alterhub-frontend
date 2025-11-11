import { TestBed } from '@angular/core/testing';

import { AlteredApiRepository } from './altered-api.repository';

describe('AlteredApi', () => {
  let service: AlteredApiRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlteredApiRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
