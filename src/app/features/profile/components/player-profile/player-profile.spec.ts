import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfile } from './player-profile';

describe('PlayerProfile', () => {
  let component: PlayerProfile;
  let fixture: ComponentFixture<PlayerProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
