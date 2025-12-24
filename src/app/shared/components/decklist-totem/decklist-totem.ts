import {
  Component,
  computed,
  effect,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { Card } from '../../../models/interfaces/api/card';
import { DECKLIST_TOTEM_LIBELLES } from '../../../constants/decks-page.constantes';

@Component({
  selector: 'decklist-totem',
  imports: [],
  templateUrl: './decklist-totem.html',
  styleUrl: './decklist-totem.css',
})
export class DecklistTotem {
  // À cabler avec le héros que l'on recevra depuis le composant parent (donc un input InputSignal<Hero>)
  public hero: string = 'Treyst & Rossum';

  public deckList: InputSignal<Array<Card>> = input.required<Array<Card>>();

  public validateCreationDeckList: OutputEmitterRef<void> = output<void>();

  public characterList: Signal<Array<{ card: Card; quantity: number }>> = computed(() =>
    this.formatDeckList(
      this.deckList().filter(
        (card: Card) => card.type.reference === this.libelles.CARD_TYPE.CHARACTER
      )
    )
  );
  public spellList: Signal<Array<{ card: Card; quantity: number }>> = computed(() =>
    this.formatDeckList(
      this.deckList().filter((card: Card) => card.type.reference === this.libelles.CARD_TYPE.SPELL)
    )
  );

  public permanentList: Signal<Array<{ card: Card; quantity: number }>> = computed(() =>
    this.formatDeckList(
      this.deckList().filter(
        (card: Card) =>
          !(
            card.type.reference === this.libelles.CARD_TYPE.CHARACTER ||
            card.type.reference === this.libelles.CARD_TYPE.SPELL
          )
      )
    )
  );

  public libelles: typeof DECKLIST_TOTEM_LIBELLES = DECKLIST_TOTEM_LIBELLES;

  public displayCommonNumber(): number {
    return this.deckList().filter(
      (card: Card) => card.rarity.reference === this.libelles.CARD_RARITY.COMMON
    ).length;
  }

  public displayRareNumber(): number {
    return this.deckList().filter(
      (card: Card) => card.rarity.reference === this.libelles.CARD_RARITY.RARE
    ).length;
  }
  public truncateSharpElement(toTruncString: string): string {
    return toTruncString.replace(/#/g, '');
  }

  public formatDeckList(deckList: Array<Card>): Array<{ card: Card; quantity: number }> {
    if (!deckList) return [];
    let uniqueCharacter: Array<Card> = [];
    for (let i = 0; i < deckList.length; i++) {
      if (uniqueCharacter.findIndex((card: Card) => card.id === deckList[i].id) === -1) {
        uniqueCharacter.push(deckList[i]);
      }
    }
    return uniqueCharacter
      .map((card: Card) => {
        return {
          card: card,
          quantity: deckList.filter((cardCharacter: Card) => cardCharacter.id === card.id).length,
        };
      })
      .sort((a: { card: Card; quantity: number }, b: { card: Card; quantity: number }) => {
        if (this.truncateSharpElement(a.card.element.mainCost) === this.truncateSharpElement(b.card.element.mainCost) && a.card.name === b.card.name) {
          return a.card.rarity.reference > b.card.rarity.reference ? 1 : -1;
        }
        if (this.truncateSharpElement(a.card.element.mainCost) === this.truncateSharpElement(b.card.element.mainCost)) {
          return a.card.name > b.card.name ? 1 : -1;
        }
        return this.truncateSharpElement(a.card.element.mainCost) > this.truncateSharpElement(b.card.element.mainCost) ? 1 : -1;
      });
  }

  public onValidateCreationDeckList(): void {
    this.validateCreationDeckList.emit();
  }

}
