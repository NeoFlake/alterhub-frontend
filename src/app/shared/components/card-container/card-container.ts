import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { BACKEND_API_ROADS } from '../../../constants/backend-api-road';
import { Card } from '../../../models/interfaces/api/card';

@Component({
  selector: 'card-container',
  imports: [],
  templateUrl: './card-container.html',
  styleUrl: './card-container.css',
})
export class CardContainer {
  public count: InputSignal<number> = input.required<number>();

  public card: InputSignal<Card> = input.required<Card>();

  public add: OutputEmitterRef<Card> = output<Card>();
  public remove: OutputEmitterRef<Card> = output<Card>();

  // Cet input est facultatif car si l'on ne souhaite pas afficher
  // les fonctionnalités lié à l'ajout dans le deck (ce qui est plus probable)
  // autant ne pas obliger à effectuer l'input
  public withCounterFunction: InputSignal<boolean> = input<boolean>(false);

  public raresSizeLimitReach: InputSignal<boolean> = input<boolean>(false);

  public deckSizeLimitReach: InputSignal<boolean>= input<boolean>(false);

  public exampleCount: InputSignal<boolean> = input<boolean>(false);

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }

  public needToBeDisabled(rarityReference: string): boolean {
    return this.deckSizeLimitReach() || this.exampleCount() || (rarityReference === "RARE" && this.raresSizeLimitReach()) || this.count() === 3;
  }

  public addCard(card: Card): void {
    this.add.emit(card);
  }

  public removeCard(card: Card): void {
    this.remove.emit(card);
  }
}
