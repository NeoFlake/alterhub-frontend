import { TestBed } from '@angular/core/testing';

import { TypeManager } from './type-manager';

describe('TypeManager', () => {
  let service: TypeManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
