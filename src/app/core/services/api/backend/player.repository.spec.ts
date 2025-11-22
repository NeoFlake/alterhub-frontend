import { TestBed } from '@angular/core/testing';

import { PlayerRepository } from './player.repository';

describe('PlayerRepository', () => {
  let service: PlayerRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
