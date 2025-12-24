import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { DECK_ROAD } from '../../../../constants/routes';
import { DeckListService } from '../../services/deck-list-service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'deck-list',
  imports: [],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList {

  private deckListService: DeckListService = inject(DeckListService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public viewMode: Signal<string> = toSignal(
    this.activatedRoute.url.pipe(
      map((segments: UrlSegment[]) => segments[segments.length - 1].path)
    ),
    { initialValue: DECK_ROAD.ALL }
  );

  public deckList = toSignal(
    this.activatedRoute.url.pipe(
      map((segments: UrlSegment[]) => segments[segments.length - 1].path),
      switchMap((mode: string) => {
        if (mode === DECK_ROAD.MINE) {
          return this.deckListService.getAllUserDecks();
        } else {
          return this.deckListService.getAllDecks();
        }
      })
    ),
    { initialValue: null }
  );

  public fixFactionIcon(nameFaction: string): string {
    return `images/icones faction/${nameFaction}.png`;
  }

}
