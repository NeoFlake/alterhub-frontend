import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletionModal } from './confirm-deletion-modal';

describe('ConfirmDeletionModal', () => {
  let component: ConfirmDeletionModal;
  let fixture: ComponentFixture<ConfirmDeletionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeletionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
