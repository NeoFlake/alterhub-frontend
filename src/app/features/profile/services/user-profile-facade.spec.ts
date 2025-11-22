import { TestBed } from '@angular/core/testing';

import { UserProfileFacade } from './user-profile-facade';

describe('UserProfileFacade', () => {
  let service: UserProfileFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
