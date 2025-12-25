import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { DECK_ROAD } from '../../../../constants/routes';
import { DeckListService } from '../../services/deck-list-service';
import { ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';

@Component({
  selector: 'deck-list',
  imports: [RouterLink],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList {
  private deckListService: DeckListService = inject(DeckListService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public deckDetailRoad: string = DECK_ROAD.ROOT;

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

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }
}
