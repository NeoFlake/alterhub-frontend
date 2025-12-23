import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklistTotem } from './decklist-totem';

describe('DecklistTotem', () => {
  let component: DecklistTotem;
  let fixture: ComponentFixture<DecklistTotem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecklistTotem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecklistTotem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
