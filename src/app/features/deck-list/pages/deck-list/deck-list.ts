import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, map, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { DECK_ROAD } from '../../../../constants/routes';
import { DeckListService } from '../../services/deck-list-service';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Deck } from '../../../../models/interfaces/api/deck';
import { DELETE_MODAL_DATA } from '../../../../constants/deck-list.constants';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';
import { Page } from '../../../../models/interfaces/api/page';
import { ConfirmDeletionModal } from '../../../../shared/components/confirm-deletion-modal/confirm-deletion-modal';

@Component({
  selector: 'deck-list',
  imports: [RouterLink, ConfirmDeletionModal, FeedbackPanel],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList {
  private deckListService: DeckListService = inject(DeckListService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  public deckToDelete: WritableSignal<string | null> = signal<string | null>(null);

  public feedBackData: WritableSignal<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = signal<{ statut: string; codeRetour: number; message: string }>({
    statut: '',
    codeRetour: 0,
    message: '',
  });

  private unsubscriber$ = new Subject<void>();

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public deckDetailRoad: typeof DECK_ROAD = DECK_ROAD;

  public deleteModalData: { title: string; body: string } = {
    title: '',
    body: '',
  };

  public viewMode: Signal<string> = toSignal(
    this.activatedRoute.url.pipe(
      map((segments: UrlSegment[]) => segments[segments.length - 1].path)
    ),
    { initialValue: DECK_ROAD.ALL }
  );

  public deckList: WritableSignal<Page<Array<Deck>> | null> = signal<Page<Array<Deck>> | null>(
    null
  );

  ngOnInit() {
    this.activatedRoute.url
      .pipe(
        map((segments: UrlSegment[]) => segments[segments.length - 1].path),
        switchMap((mode: string) => {
          if (mode === DECK_ROAD.MINE) {
            return this.deckListService.getAllUserDecks();
          } else {
            return this.deckListService.getAllDecks();
          }
        }),
        tap((pageDeck: Page<Array<Deck>>) => this.deckList.set(pageDeck))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public fixFactionIcon(nameFaction: string): string {
    return `images/icones faction/${nameFaction}.png`;
  }

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }

  public deleteDeck(deck: Deck): void {
    this.openDeletionModale(deck);
  }

  public updateDeck(deck: Deck): void {
    this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.CREATE, deck.id!]);
  }

  public openDeletionModale(deck: Deck): void {
    this.deleteModalData.title = `${DELETE_MODAL_DATA.TITLE}${deck.hero.name}`;
    this.deleteModalData.body = `${DELETE_MODAL_DATA.BODY}${deck.name}`;
    this.deckToDelete.set(deck.id!);
  }

  public onConfirmDeletionModalClose(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.deckListService
        .deleteDeckById(this.deckToDelete()!)
        .pipe(
          tap(() => {
            this.feedBackData.set({
              statut: AUTHENTIFICATION_STATUT.SUCCESS,
              codeRetour: 200,
              message: FEEDBACK_PANEL_MESSAGES.DELETE_DECK_SUCCESS,
            });
            this.deckList.update((deckList: Page<Array<Deck>> | null) => {
              if (!deckList) return null;
              return {
                ...deckList,
                content: deckList.content.filter((deck: Deck) => deck.id !== this.deckToDelete()),
                totalElements: deckList.totalElements - 1
              };
            });
            this.deckToDelete.set(null);
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            this.feedBackData.set({
              statut: AUTHENTIFICATION_STATUT.ERROR,
              codeRetour: httpErrorResponse.error.status,
              message: httpErrorResponse.error.message,
            });
            return of(null);
          }),
          switchMap(() => timer(2000)),
          finalize(() =>
            this.feedBackData.set({
              statut: '',
              codeRetour: 0,
              message: '',
            })
          ),
          takeUntil(this.unsubscriber$)
        )
        .subscribe();
    } else {
      this.deckToDelete.set(null);
      this.feedBackData.set({
        statut: AUTHENTIFICATION_STATUT.SUCCESS,
        codeRetour: 200,
        message: FEEDBACK_PANEL_MESSAGES.CANCEL_DELETE_DECK,
      });
      setTimeout(() => {
        this.feedBackData.set({
          statut: '',
          codeRetour: 0,
          message: '',
        });
      }, 2000);
    }
  }
}
