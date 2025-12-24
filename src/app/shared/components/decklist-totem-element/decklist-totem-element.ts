import { Component, input, InputSignal } from '@angular/core';
import { Card } from '../../../models/interfaces/api/card';

@Component({
  selector: 'decklist-totem-element',
  imports: [],
  templateUrl: './decklist-totem-element.html',
  styleUrl: './decklist-totem-element.css',
})
export class DecklistTotemElement {

  public element: InputSignal<{card: Card, quantity: number}> = input.required<{card: Card, quantity: number}>();

  public truncateSharpElement(toTruncString: string): string {
    return toTruncString.replace(/#/g, '');
  }

}
