import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainer } from './card-container';

describe('CardContainer', () => {
  let component: CardContainer;
  let fixture: ComponentFixture<CardContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
