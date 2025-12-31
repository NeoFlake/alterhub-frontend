import { Component, inject, model, signal, WritableSignal } from '@angular/core';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { UpdateUserForm } from '../update-user-form/update-user-form';
import { PROFILE_LIBELLE } from '../../../../constants/profile-page.constantes';
import { UserManager } from '../../../../core/services/user-manager';
import { StateService } from '../../../../core/services/state/state-service';
import { ConfirmDeletionModal } from '../../../../shared/components/confirm-deletion-modal/confirm-deletion-modal';
import { AUTHENTIFICATION_STATUT, FEEDBACK_PANEL_MESSAGES } from '../../../../constants/authentification-page.constantes';

@Component({
  selector: 'user-management',
  imports: [FeedbackPanel, UpdateUserForm, ConfirmDeletionModal],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  private userManager: UserManager = inject(UserManager);
  private stateService: StateService = inject(StateService);

  public feedBackData = model<{ statut: string; codeRetour: number; message: string }>({
    statut: '',
    codeRetour: 0,
    message: '',
  });

  public deletionAsked: WritableSignal<boolean> = signal<boolean>(false);

  public deleteModalData: { title: string; body: string } = {
    title: '',
    body: '',
  };

  public userManagerLibelle = PROFILE_LIBELLE.USER_MANAGER;

  public handleFeedBackForm(feedBackData: {
    statut: string;
    codeRetour: number;
    message: string;
  }): void {
    this.feedBackData.set(feedBackData);
  }

  public onClickDeleteAccount(): void {
    this.deleteModalData.title = `${this.userManagerLibelle.DELETION_MODAL_DATA.TITLE}${
      this.stateService.userLogged().firstName
    } ${this.stateService.userLogged().lastName}`;
    this.deleteModalData.body = this.userManagerLibelle.DELETION_MODAL_DATA.BODY;
    this.deletionAsked.set(true);
  }

  public deleteUser(): void {
    this.userManager.deleteUserById(this.stateService.userLogged().id);
  }
  
  public onConfirmDeletionModalClose(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.deleteUser();
    } else {
      this.deletionAsked.set(false);
      this.feedBackData.set({
        statut: AUTHENTIFICATION_STATUT.SUCCESS,
        codeRetour: 200,
        message: FEEDBACK_PANEL_MESSAGES.CANCEL_DELETE_USER,
      });
      setTimeout(() => {
        this.feedBackData.set({
          statut: '',
          codeRetour: 0,
          message: '',
        });
      }, 2000);
    }
  }
}
