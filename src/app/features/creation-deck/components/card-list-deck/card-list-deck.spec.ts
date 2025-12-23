import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListDeck } from './card-list-deck';

describe('CardListDeck', () => {
  let component: CardListDeck;
  let fixture: ComponentFixture<CardListDeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListDeck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListDeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
