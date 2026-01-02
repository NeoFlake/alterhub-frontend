import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayingDeckZone } from './displaying-deck-zone';

describe('DisplayingDeckZone', () => {
  let component: DisplayingDeckZone;
  let fixture: ComponentFixture<DisplayingDeckZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayingDeckZone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayingDeckZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
