import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchFormLink } from './switch-form-link';

describe('SwitchFormLink', () => {
  let component: SwitchFormLink;
  let fixture: ComponentFixture<SwitchFormLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchFormLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchFormLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
