import { Component, inject, OnDestroy, output, OutputEmitterRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormManager } from '../../services/form-manager';
import { catchError, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InvalidFeedback } from '../../../../shared/components/invalid-feedback/invalid-feedback';
import { Router } from '@angular/router';
import { AUTHENTIFICATION_ROAD } from '../../../../constants/routes';
import {
  AUTHENTIFICATION_LIBELLE,
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm-password.validator';

@Component({
  selector: 'create-account-form',
  imports: [ReactiveFormsModule, InvalidFeedback],
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.css',
})
export class CreateAccountForm implements OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private formManager: FormManager = inject(FormManager);
  private router: Router = inject(Router);

  private unsubscriber$ = new Subject<void>();

  public createAccountForm: FormGroup;

  public firstName: FormControl<string>;
  public lastName: FormControl<string>;
  public playerName: FormControl<string>;
  public email: FormControl<string>;
  public password: FormControl<string>;
  public confirmPassword: FormControl<string>;

  public revealPassword: boolean = false;

  public feedbackPanelData: OutputEmitterRef<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = output<{ statut: string; codeRetour: number; message: string }>();

  public readonly authentificationLibelle = AUTHENTIFICATION_LIBELLE;

  constructor() {
    this.firstName = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });
    this.lastName = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });
    this.playerName = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });
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
    this.confirmPassword = new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/),
      ],
    });

    this.createAccountForm = this.formBuilder.group(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        playerName: this.playerName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validators: confirmPasswordValidator(),
      }
    );
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public createAccount(): void {

    let newUser: Partial<{
      firstName: string;
      lastName: string;
      playerName: string;
      email: string;
      password: string;
    }> = this.createAccountForm.value;
    
    this.formManager
      .createAccount(newUser)
      .pipe(
        tap(() => {
          this.feedbackPanelData.emit({
            statut: AUTHENTIFICATION_STATUT.SUCCESS,
            codeRetour: 200,
            message: FEEDBACK_PANEL_MESSAGES.CREATE_ACCOUNT_SUCCESS,
          });
        }),
        switchMap(() => timer(1500)),
        tap(() => this.router.navigate([AUTHENTIFICATION_ROAD.ROOT, AUTHENTIFICATION_ROAD.LOGIN])),
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

  public showPassword(): void {
    this.revealPassword = true;
  }

  public hidePassword(): void {
    this.revealPassword = false;
  }
}
