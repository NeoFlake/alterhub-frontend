import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormManager } from '../../services/form-manager';
import { tap } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'create-account-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.css',
})
export class CreateAccountForm {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private formManager: FormManager = inject(FormManager);

  public createAccountForm: FormGroup;

  public firstName: FormControl<string>;
  public lastName: FormControl<string>;
  public playerName: FormControl<string>;
  public email: FormControl<string>;
  public password: FormControl<string>;
  public confirmPassword: FormControl<string>;

  constructor() {
    this.firstName = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)] });
    this.lastName = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)] });
    this.playerName = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)] });
    this.email = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)] });
    this.password = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.minLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/)] });
    this.confirmPassword = new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.minLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/)] })

    this.createAccountForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      playerName: this.playerName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  public createAccount(): void {
    if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched(); // affiche les erreurs
      return;
    }

    let newUser: Partial<{ firstName: string, lastName: string, playerName: string, email: string, password: string, newPassword: string }> = this.createAccountForm.value;
    console.log(newUser);
    this.formManager.createAccount(newUser)
    .pipe(
      tap((user: User) => {
        console.log(user);
      })
    )
    .subscribe({
      error: (httpErrorResponse: HttpErrorResponse) => console.error(httpErrorResponse.message)
    });
  }

}
