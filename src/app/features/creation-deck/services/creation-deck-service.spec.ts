import { TestBed } from '@angular/core/testing';

import { CreationDeckService } from './creation-deck-service';

describe('CreationDeckService', () => {
  let service: CreationDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
