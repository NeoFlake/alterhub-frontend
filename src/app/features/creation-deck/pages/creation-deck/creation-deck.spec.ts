import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDeck } from './creation-deck';

describe('CreationDeck', () => {
  let component: CreationDeck;
  let fixture: ComponentFixture<CreationDeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationDeck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationDeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
