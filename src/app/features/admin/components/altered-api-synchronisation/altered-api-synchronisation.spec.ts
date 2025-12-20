import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteredApiSynchronisation } from './altered-api-synchronisation';

describe('AlteredApiSynchronisation', () => {
  let component: AlteredApiSynchronisation;
  let fixture: ComponentFixture<AlteredApiSynchronisation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlteredApiSynchronisation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlteredApiSynchronisation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
