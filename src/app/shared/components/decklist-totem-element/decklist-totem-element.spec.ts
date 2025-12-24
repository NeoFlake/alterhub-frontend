import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklistTotemElement } from './decklist-totem-element';

describe('DecklistTotemElement', () => {
  let component: DecklistTotemElement;
  let fixture: ComponentFixture<DecklistTotemElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecklistTotemElement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecklistTotemElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
