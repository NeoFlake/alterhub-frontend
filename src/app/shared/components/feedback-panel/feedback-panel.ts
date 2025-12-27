import { Component, computed, input, InputSignal } from '@angular/core';
import {
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../constants/authentification-page.constantes';

@Component({
  selector: 'feedback-panel',
  imports: [],
  templateUrl: './feedback-panel.html',
  styleUrl: './feedback-panel.css',
})
export class FeedbackPanel {
  public data: InputSignal<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = input.required<{ statut: string; codeRetour: number; message: string }>();

  public authentificationStatut = AUTHENTIFICATION_STATUT;

  // Ce computed m'assure que quand l'input data est modifié
  // s'il est illisible alors on fournira un élément neutre pour
  // éviter les crashs intempestifs
  public safeData = computed(() => {
    return this.data() || { statut: '', codeRetour: 0, message: '' };
  });

  public message = computed(() => {

    const value = this.safeData();

    let displayedMessage: string = "";

    if (value.message && value.message.trim().length > 0) {
      return value.message;
    }

    if (value.codeRetour > 299) {
      switch (value.codeRetour) {
        case 400:
          displayedMessage = FEEDBACK_PANEL_MESSAGES.USER_REQUEST_ERROR;
          break;
        case 422:
          displayedMessage = FEEDBACK_PANEL_MESSAGES.DATA_ERROR;
          break;
        case 500:
          displayedMessage = FEEDBACK_PANEL_MESSAGES.BACK_ERROR;
          break;
        default:
          displayedMessage = FEEDBACK_PANEL_MESSAGES.EXCEPTION_ERROR;
          break;
      }
    }

    return displayedMessage;
  });
}
