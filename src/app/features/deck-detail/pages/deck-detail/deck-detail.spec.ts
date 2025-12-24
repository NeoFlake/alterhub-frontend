import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDetail } from './deck-detail';

describe('DeckDetail', () => {
  let component: DeckDetail;
  let fixture: ComponentFixture<DeckDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
