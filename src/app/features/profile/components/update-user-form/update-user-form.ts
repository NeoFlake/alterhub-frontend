import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { InvalidFeedback } from '../../../../shared/components/invalid-feedback/invalid-feedback';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmNewPasswordValidator } from '../../../../shared/validators/confirm-new-password.validator';
import {
  AUTHENTIFICATION_LIBELLE,
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
  VALIDATOR_EMAIL_PATTERN,
  VALIDATOR_PASSWORD_PATTERN,
} from '../../../../constants/authentification-page.constantes';
import { StateService } from '../../../../core/services/state/state-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, tap, catchError, takeUntil, finalize } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { UserManager } from '../../../../core/services/user-manager';
import { Router } from '@angular/router';
import { HOMEPAGE_ROAD, USER_ROAD } from '../../../../constants/routes';

@Component({
  selector: 'update-user-form',
  imports: [ReactiveFormsModule, InvalidFeedback],
  templateUrl: './update-user-form.html',
  styleUrl: './update-user-form.css',
})
export class UpdateUserForm {
  public stateService: StateService = inject(StateService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userManager: UserManager = inject(UserManager);
  private router: Router = inject(Router);

  public feedbackPanelData: OutputEmitterRef<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = output<{ statut: string; codeRetour: number; message: string }>();

  private unsubscriber$ = new Subject<void>();

  public updateUserForm: FormGroup;

  public firstName: FormControl<string>;
  public lastName: FormControl<string>;
  public email: FormControl<string>;
  public password: FormControl<string>;
  public newPassword: FormControl<string | null>;
  public confirmNewPassword: FormControl<string | null>;

  public readonly authentificationLibelle = AUTHENTIFICATION_LIBELLE;

  public revealPassword: boolean = false;

  constructor() {
    this.firstName = new FormControl<string>(this.stateService.userLogged().firstName, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });
    this.lastName = new FormControl<string>(this.stateService.userLogged().lastName, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });
    this.email = new FormControl<string>(this.stateService.userLogged().email, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(VALIDATOR_EMAIL_PATTERN),
      ],
    });
    this.password = new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(VALIDATOR_PASSWORD_PATTERN),
      ],
    });
    this.newPassword = new FormControl<string | null>('', {
      validators: [Validators.minLength(12), Validators.pattern(VALIDATOR_PASSWORD_PATTERN)],
    });
    this.confirmNewPassword = new FormControl<string | null>('', {
      validators: [Validators.minLength(12), Validators.pattern(VALIDATOR_PASSWORD_PATTERN)],
    });

    this.updateUserForm = this.formBuilder.group(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword,
      },
      {
        validators: confirmNewPasswordValidator(),
      }
    );
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public updateUser(): void {
    let updatingFormData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      newPassword: string | null;
    }> = this.updateUserForm.value;

    this.userManager
      .updateUserById(updatingFormData, this.stateService.userLogged())
      .pipe(
        tap((user: User) => {
          this.stateService.updateUser(user);
          this.feedbackPanelData.emit({
            statut: AUTHENTIFICATION_STATUT.SUCCESS,
            codeRetour: 200,
            message: FEEDBACK_PANEL_MESSAGES.UPDATE_SUCCESS,
          });
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.feedbackPanelData.emit({
            statut: AUTHENTIFICATION_STATUT.ERROR,
            codeRetour: httpErrorResponse.error.status,
            message: httpErrorResponse.error.message,
          });
          return [];
        }),
        finalize(() =>
          setTimeout(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate([`${USER_ROAD}`]));
          }, 1500)
        ),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  public showPassword() {
    this.revealPassword = true;
  }

  public hidePassword() {
    this.revealPassword = false;
  }
}
