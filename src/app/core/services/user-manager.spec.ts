import { TestBed } from '@angular/core/testing';

import { UserManager } from './user-manager';

describe('UserManager', () => {
  let service: UserManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
