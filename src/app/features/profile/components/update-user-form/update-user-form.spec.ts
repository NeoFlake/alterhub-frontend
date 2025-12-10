import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserForm } from './update-user-form';

describe('UpdateUserForm', () => {
  let component: UpdateUserForm;
  let fixture: ComponentFixture<UpdateUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
