import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFeedback } from './invalid-feedback';

describe('InvalidFeedback', () => {
  let component: InvalidFeedback;
  let fixture: ComponentFixture<InvalidFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
