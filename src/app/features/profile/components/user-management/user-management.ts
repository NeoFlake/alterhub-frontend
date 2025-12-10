import { Component, inject, model } from '@angular/core';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { UpdateUserForm } from '../update-user-form/update-user-form';
import { PROFILE_LIBELLE } from '../../../../constants/profile-page.constantes';
import { UserManager } from '../../../../core/services/user-manager';
import { StateService } from '../../../../core/services/state/state-service';

@Component({
  selector: 'user-management',
  imports: [FeedbackPanel, UpdateUserForm],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {

  private userManager: UserManager = inject(UserManager);
  private stateService: StateService = inject(StateService);

  public feedBackData = model<{ statut: string; codeRetour: number; message: string }>({
    statut: "",
    codeRetour: 0,
    message: ""
  });

  public userManagerLibelle = PROFILE_LIBELLE.USER_MANAGER;

  public handleFeedBackForm(feedBackData: { statut: string; codeRetour: number; message: string }): void {
    this.feedBackData.set(feedBackData);
  }

  public deleteUser(): void {
    this.userManager.deleteUserById(this.stateService.userLogged().id);
  }

}
