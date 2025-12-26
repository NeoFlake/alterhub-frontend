import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { map, switchMap, tap } from 'rxjs';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Card } from '../../../../models/interfaces/api/card';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Hero } from '../../../../models/interfaces/api/hero';
import { Page } from '../../../../models/interfaces/api/page';
import { CardContainer } from '../../../../shared/components/card-container/card-container';
import { DecklistTotem } from '../../../../shared/components/decklist-totem/decklist-totem';
import { CreationDeckService } from '../../../creation-deck/services/creation-deck-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UrlSegment } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';
import { Deck } from '../../../../models/interfaces/api/deck';
import { DeckDetailService } from '../../services/deck-detail-service';

@Component({
  selector: 'deck-detail',
  imports: [Pagination, CardContainer, DecklistTotem],
  templateUrl: './deck-detail.html',
  styleUrl: './deck-detail.css',
})
export class DeckDetail {
  private deckDetailService: DeckDetailService = inject(DeckDetailService);

  public faction: InputSignal<Faction> = input.required<Faction>();
  public hero: InputSignal<Hero> = input.required<Hero>();

  public validateCreationDeckList: OutputEmitterRef<Array<Card>> = output<Array<Card>>();

  public pageCards: WritableSignal<Page<Array<Card>>> = signal({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false,
  });

  public scrollbarColor: WritableSignal<string> = signal<string>('#777777ff');

  public deckId: InputSignal<string> = input.required<string>();

  public deck: Signal<Deck | undefined> = toSignal(
    toObservable(this.deckId).pipe(
      switchMap((deckId: string) => this.deckDetailService.getDeckById(deckId))
    )
  );

  // ngOnInit() {
  //   this.loadCardPage(0, false);
  //   this.scrollbarColor.set(this.faction().color);
  // }

  // public getCardImageUrl(imagePath: string): string {
  //   if (!imagePath) return 'assets/default-card.png';
  //   return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  // }

  // public getCardCount(cardId: string): number {
  //   return this.deckList().filter((card: Card) => cardId === card.id).length;
  // }

  // public getExampleCount(cardName: string): boolean {
  //   return this.deckList().filter((card: Card) => cardName === card.name).length >= 3;
  // }

  // public getRaresSizeLimitReach(): boolean {
  //   return this.deckList().filter((card: Card) => card.rarity.reference === 'RARE').length >= 15;
  // }

  // public getDeckSizeLimitReach(): boolean {
  //   return this.deckList().length >= 59;
  // }

  // public addCardToDeck(card: Card): void {
  //   this.deckList.update((deckList: Array<Card>) => {
  //     return [...deckList, card];
  //   });
  // }

  // public removeCardFromDeck(card: Card): void {
  //   this.deckList.update((deckList: Array<Card>) => {
  //     // Il peut arriver dans des cas très corner que l'index remonté soit -1 car la carte
  //     // peut être introuvable (latence haute ou asynchronie mal géré [on sait jamais ^^])
  //     const cardIndex: number = deckList.findIndex((cardOnDeck: Card) => cardOnDeck.id === card.id);
  //     // Dans ce cas là alors on return tel quel car c'est un défaut d'appel et pi c'est tout
  //     if (cardIndex === -1) {
  //       return deckList;
  //     }
  //     // On crame le premier élément avec l'index souhaité dans le tableau de card
  //     deckList.splice(cardIndex, 1);
  //     // Puis on renvoit un petit tableau rebuild depuis l'origine pour indiquer une nouvelle référence à notre signal
  //     return [...deckList];
  //   });
  // }

  // public onValidateCreationDeckList(): void {
  //   this.validateCreationDeckList.emit(this.deckList());
  // }
}
