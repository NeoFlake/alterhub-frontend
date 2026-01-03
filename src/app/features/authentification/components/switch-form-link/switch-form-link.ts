import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'switch-form-link',
  imports: [RouterLink],
  templateUrl: './switch-form-link.html',
  styleUrl: './switch-form-link.css',
})
export class SwitchFormLink {

  public libelle: InputSignal<string> = input.required<string>();
  public redirectLink: InputSignal<string> = input.required<string>();

}
