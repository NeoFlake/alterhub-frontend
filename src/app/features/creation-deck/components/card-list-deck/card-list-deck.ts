import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { CardContainer } from '../../../../shared/components/card-container/card-container';
import { DecklistTotem } from '../../../../shared/components/decklist-totem/decklist-totem';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { tap } from 'rxjs';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Hero } from '../../../../models/interfaces/api/hero';
import { CreationDeckService } from '../../services/creation-deck-service';

@Component({
  selector: 'card-list-deck',
  imports: [Pagination, CardContainer, DecklistTotem],
  templateUrl: './card-list-deck.html',
  styleUrl: './card-list-deck.css',
})
export class CardListDeck {
  private creationDeckService: CreationDeckService = inject(CreationDeckService);

  public faction: InputSignal<Faction> = input.required<Faction>();
  public hero: InputSignal<Hero> = input.required<Hero>();

  public existingDeckList: InputSignal<Array<Card>> = input.required();

  public validateCreationDeckList: OutputEmitterRef<Array<Card>> = output<Array<Card>>();

  public cancelClick: OutputEmitterRef<void> = output<void>();

  public pageCards: WritableSignal<Page<Array<Card>>> = signal({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false,
  });

  public deckList: WritableSignal<Array<Card>> = signal<Array<Card>>([]);

  public scrollbarColor: WritableSignal<string> = signal<string>('#777777ff');

  public cancelButtonLibelle: string = "Annuler";

  constructor(){
    effect(() => {
      const existingDeckList: Array<Card> = this.existingDeckList();
      this.deckList.update(() => [...existingDeckList]);
    });
  }

  ngOnInit() {
    this.loadCardPage(0, false);
    this.scrollbarColor.set(this.faction().color);
  }

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }

  public loadCardPage(pageNumber: number, anchorToTopPage: boolean): void {
    this.creationDeckService
      .getCardsByFactionId(this.faction().id, pageNumber)
      .pipe(
        tap((cardPage: Page<Array<Card>>) => {
          this.pageCards.set(cardPage);
          anchorToTopPage ? window.scrollTo({ top: 0, behavior: 'instant' }) : null;
        })
      )
      .subscribe();
  }

  public onPageSelect(pageSelected: number): void {
    this.loadCardPage(pageSelected, true);
  }

  public getCardCount(cardId: string): number {
    return this.deckList().filter((card: Card) => cardId === card.id).length;
  }

  public getExampleCount(cardName: string): boolean {
    return this.deckList().filter((card: Card) => cardName === card.name).length >= 3;
  }

  public getRaresSizeLimitReach(): boolean {
    return this.deckList().filter((card: Card) => card.rarity.reference === 'RARE').length >= 15;
  }

  public getDeckSizeLimitReach(): boolean {
    return this.deckList().length >= 59;
  }

  public addCardToDeck(card: Card): void {
    this.deckList.update((deckList: Array<Card>) => {
      return [...deckList, card];
    });
  }

  public removeCardFromDeck(card: Card): void {
    this.deckList.update((deckList: Array<Card>) => {
      // Il peut arriver dans des cas très corner que l'index remonté soit -1 car la carte
      // peut être introuvable (latence haute ou asynchronie mal géré [on sait jamais ^^])
      const cardIndex: number = deckList.findIndex((cardOnDeck: Card) => cardOnDeck.id === card.id);
      // Dans ce cas là alors on return tel quel car c'est un défaut d'appel et pi c'est tout
      if (cardIndex === -1) {
        return deckList;
      }
      // On crame le premier élément avec l'index souhaité dans le tableau de card
      deckList.splice(cardIndex, 1);
      // Puis on renvoit un petit tableau rebuild depuis l'origine pour indiquer une nouvelle référence à notre signal
      return [...deckList];
    });
  }

  public onValidateCreationDeckList(): void {
    this.validateCreationDeckList.emit(this.deckList());
  }

  public onCancelClick(): void {
    this.cancelClick.emit();
  }

}
