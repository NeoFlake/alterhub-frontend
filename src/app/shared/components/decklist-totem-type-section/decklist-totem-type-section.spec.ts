import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklistTotemTypeSection } from './decklist-totem-type-section';

describe('DecklistTotemTypeSection', () => {
  let component: DecklistTotemTypeSection;
  let fixture: ComponentFixture<DecklistTotemTypeSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecklistTotemTypeSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecklistTotemTypeSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
