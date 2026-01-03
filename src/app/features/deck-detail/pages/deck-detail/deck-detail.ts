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
import { switchMap } from 'rxjs';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import { CardContainer } from '../../../../shared/components/card-container/card-container';
import { DecklistTotem } from '../../../../shared/components/decklist-totem/decklist-totem';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Deck } from '../../../../models/interfaces/api/deck';
import { DeckDetailService } from '../../services/deck-detail-service';
import { DECKLIST_LIBELLE } from '../../../../constants/deck-list.constants';
import { Location } from "@angular/common";

@Component({
  selector: 'deck-detail',
  imports: [CardContainer, DecklistTotem],
  templateUrl: './deck-detail.html',
  styleUrl: './deck-detail.css',
})
export class DeckDetail {
  private deckDetailService: DeckDetailService = inject(DeckDetailService);
  private location: Location = inject(Location);

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

  public cancelButtonLibelle: string = DECKLIST_LIBELLE.CANCEL_BUTTON_LIBELLE;

  public noDeckDetailPlaceholder: string = DECKLIST_LIBELLE.NO_DECK_DETAIL_PLACEHOLDER;

  public deck: Signal<Deck | undefined> = toSignal(
    toObservable(this.deckId).pipe(
      switchMap((deckId: string) => this.deckDetailService.getDeckById(deckId))
    )
  );

  // Permet de renvoyer au composant de display du visuel des cartes
  // uniquement un exemplaire de chaque carte du deck, évite que cela
  // puisse créer des doublons visuellement dégueulasse à voir
  public cardList: Signal<Array<Card>> = computed(() => {
    const deckList: Deck | undefined = this.deck();
    if (deckList) {
      return deckList.cards
        .filter(
          (card: Card, index: number, deckList: Array<Card>) =>
            index === deckList.findIndex((originalCard: Card) => card.id === originalCard.id)
        )
        .sort((a: Card, b: Card) => {
          if (a.type.reference !== b.type.reference) {
            if (a.type.reference === 'CHARACTER') {
              return -1;
            } else if (b.type.reference === 'CHARACTER') {
              return 1;
            } else {
              return a.type.reference < b.type.reference ? 1 : -1;
            }
          } else {
            if(a.element.mainCost.replace(/#/g, '') !== b.element.mainCost.replace(/#/g, '')) {
              return a.element.mainCost.replace(/#/g, '') > b.element.mainCost.replace(/#/g, '') ? 1 : -1;
            } else {
              if(a.element.recallCost.replace(/#/g, '') !== b.element.recallCost.replace(/#/g, '')){
                return a.element.recallCost.replace(/#/g, '') > b.element.recallCost.replace(/#/g, '') ? 1 : -1;
              } else {
                return a.name > b.name ? 1 : -1;
              }
            }
          }
        });
    } else {
      return [];
    }
  });

  public determineCardQuantity(cardId: string): number {
    return this.deck()!.cards.filter((card: Card) => card.id === cardId).length;
  }

  public onCancelClick(): void {
    this.location.back();
  }
}
