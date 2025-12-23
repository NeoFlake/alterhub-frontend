import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDeckInfoForm } from './main-deck-info-form';

describe('MainDeckInfoForm', () => {
  let component: MainDeckInfoForm;
  let fixture: ComponentFixture<MainDeckInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDeckInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDeckInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
