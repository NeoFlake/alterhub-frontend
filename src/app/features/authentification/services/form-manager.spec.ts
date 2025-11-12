import { TestBed } from '@angular/core/testing';

import { FormManager } from './form-manager';

describe('FormManager', () => {
  let service: FormManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
