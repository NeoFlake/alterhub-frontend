import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthentification } from '../../../../models/interfaces/users/userAuthentification';
import { FormManager } from '../../services/form-manager';
import { switchMap, tap } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private formManager: FormManager = inject(FormManager);

  public loginForm: FormGroup;

  public email: FormControl<string>;
  public password: FormControl<string>;

  constructor(){
    this.email = new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]});
    this.password = new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.minLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/)]})

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  public login(): void {
    const credentials: UserAuthentification = this.loginForm.value;
    this.formManager.login(credentials)
    .pipe(
      switchMap((userLogged: User) => {
        this.formManager.
      }),
      tap()
    )
    .subscribe({
      error: (httpErrorResponse: HttpErrorResponse) => console.error(httpErrorResponse.message)
    })
  }

}
