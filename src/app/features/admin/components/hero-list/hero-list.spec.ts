import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroList } from './hero-list';

describe('HeroList', () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
