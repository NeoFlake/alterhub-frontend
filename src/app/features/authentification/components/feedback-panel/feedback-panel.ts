import { Component, effect, input, InputSignal, OnInit } from '@angular/core';
import { AUTHENTIFICATION_STATUT, FEEDBACK_PANEL_MESSAGES } from '../../../../constants/authentification-page.constantes';

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
    message: string
  }> = input.required<{ statut: string; codeRetour: number; message: string }>();

  public authentificationStatut = AUTHENTIFICATION_STATUT;

  public message: string = "";

  constructor() {
    effect(() => {
      const value = this.data();
      this.message = this.determineMessage(value.codeRetour, value.message);
    });
  }

  private determineMessage(codeRetour: number, message: string): string {

    let displayedMessage: string = message;

    if (codeRetour > 299) {
      switch (codeRetour) {
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
  };

}
