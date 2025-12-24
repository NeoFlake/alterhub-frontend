import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CardContainer } from '../../../../shared/components/card-container/card-container';
import { DecklistTotem } from '../../../../shared/components/decklist-totem/decklist-totem';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { tap } from 'rxjs';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import { HomepageFacade } from '../../../homepage/services/homepage-facade';

@Component({
  selector: 'app-card-list-deck',
  imports: [Pagination, CardContainer, DecklistTotem],
  templateUrl: './card-list-deck.html',
  styleUrl: './card-list-deck.css',
})
export class CardListDeck {
  private homepageFacade: HomepageFacade = inject(HomepageFacade);

  public pageCards: WritableSignal<Page<Array<Card>>> = signal({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false,
  });

  ngOnInit() {
    this.loadCardPage(0, false);
  }

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }

  public loadCardPage(pageNumber: number, anchorToTopPage: boolean): void {
    this.homepageFacade
      .getCardsByFactionId('7a0c3410-b39f-449b-90d0-ea7f99d71899', pageNumber)
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

  public deckList: WritableSignal<Array<Card>> = signal<Array<Card>>([]);
}
