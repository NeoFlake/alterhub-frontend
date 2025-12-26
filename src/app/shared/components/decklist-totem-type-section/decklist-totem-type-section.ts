import { Component, input, InputSignal } from '@angular/core';
import { DecklistTotemElement } from '../decklist-totem-element/decklist-totem-element';
import { Card } from '../../../models/interfaces/api/card';

@Component({
  selector: 'decklist-totem-type-section',
  imports: [DecklistTotemElement],
  templateUrl: './decklist-totem-type-section.html',
  styleUrl: './decklist-totem-type-section.css',
})
export class DecklistTotemTypeSection {
  public titleLibelle: InputSignal<string> = input.required<string>();
  public count: InputSignal<number> = input.required<number>();
  public list: InputSignal<
    Array<
      {
        card: Card;
        quantity: number;
      }
    >
  > = input.required<
    Array<
      {
        card: Card;
        quantity: number;
      }
    >
  >();
}
