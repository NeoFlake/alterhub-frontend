import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDeck } from './read-deck';

describe('ReadDeck', () => {
  let component: ReadDeck;
  let fixture: ComponentFixture<ReadDeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadDeck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadDeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
