import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailModal } from './hero-detail-modal';

describe('HeroDetailModal', () => {
  let component: HeroDetailModal;
  let fixture: ComponentFixture<HeroDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
