import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountForm } from './create-account-form';

describe('CreateAccountForm', () => {
  let component: CreateAccountForm;
  let fixture: ComponentFixture<CreateAccountForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
