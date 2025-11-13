import { Component, inject, input, InputSignal } from '@angular/core';
import { FormManager } from '../../services/form-manager';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'invalid-feedback',
  imports: [],
  templateUrl: './invalid-feedback.html',
  styleUrl: './invalid-feedback.css'
})
export class InvalidFeedback {

  public formManager: FormManager = inject(FormManager);

  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public controlName: InputSignal<string> = input.required<string>();

  getFormControlErrors(controlName: string): Array<string> {
    return this.formManager.getFormControlErrors(this.formGroup(), controlName);
  }

}
