import { TestBed } from '@angular/core/testing';

import { PlayerProfileFacade } from './player-profile-facade';

describe('PlayerProfileFacade', () => {
  let service: PlayerProfileFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerProfileFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
