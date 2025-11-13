import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'switch-form-link',
  imports: [],
  templateUrl: './switch-form-link.html',
  styleUrl: './switch-form-link.css',
})
export class SwitchFormLink {

  public libelle: InputSignal<string | undefined> = input<string>();
  public redirectLink: InputSignal<string | undefined> = input<string>();

}
