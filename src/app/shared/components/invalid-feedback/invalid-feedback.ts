import { Component, inject, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvalidFeedbackManager } from '../../../core/services/form/invalid-feedback-manager';

@Component({
  selector: 'invalid-feedback',
  imports: [],
  templateUrl: './invalid-feedback.html',
  styleUrl: './invalid-feedback.css'
})
export class InvalidFeedback {

  public invalidFeedbackManager: InvalidFeedbackManager = inject(InvalidFeedbackManager);

  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public controlName: InputSignal<string> = input.required<string>();

  getFormControlErrors(controlName: string): Array<string> {
    return this.invalidFeedbackManager.getFormControlErrors(this.formGroup(), controlName);
  }

}
