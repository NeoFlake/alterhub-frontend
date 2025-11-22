import { Component, inject, OnDestroy, output, OutputEmitterRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthentification } from '../../../../models/interfaces/users/userAuthentification';
import { FormManager } from '../../services/form-manager';
import { catchError, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOMEPAGE_ROAD } from '../../../../constants/routes';
import { InvalidFeedback } from '../invalid-feedback/invalid-feedback';
import {
  AUTHENTIFICATION_LIBELLE,
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule, InvalidFeedback],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private formManager: FormManager = inject(FormManager);
  private router: Router = inject(Router);

  public loginForm: FormGroup;

  public email: FormControl<string>;
  public password: FormControl<string>;

  public feedbackPanelData: OutputEmitterRef<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = output<{ statut: string; codeRetour: number; message: string }>();

  private unsubscriber$ = new Subject<void>();

  public readonly authentificationLibelle = AUTHENTIFICATION_LIBELLE;

  constructor() {
    this.email = new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    });
    this.password = new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/),
      ],
    });

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public login(): void {
    const credentials: UserAuthentification = this.loginForm.value;
    this.formManager
      .login(credentials)
      .pipe(
        switchMap((userLogged: User) => {
          localStorage.setItem('loggedInfo', JSON.stringify(userLogged));
          return this.formManager.accessGranted(userLogged);
        }),
        tap((accessGranted: boolean) => {
          localStorage.setItem('accessGranted', JSON.stringify(accessGranted));
          this.feedbackPanelData.emit({
            statut: AUTHENTIFICATION_STATUT.SUCCESS,
            codeRetour: 200,
            message: FEEDBACK_PANEL_MESSAGES.LOGIN_SUCCESS,
          });
        }),
        switchMap(() => timer(1500)),
        tap(() => {
          this.router.navigate([HOMEPAGE_ROAD]);
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.feedbackPanelData.emit({
            statut: AUTHENTIFICATION_STATUT.ERROR,
            codeRetour: httpErrorResponse.error.status,
            message: httpErrorResponse.error.message,
          });
          return [];
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }
}
