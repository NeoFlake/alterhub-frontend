import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HomepageFacade } from '../../services/homepage-facade';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import {
  catchError,
  finalize,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { Deck } from '../../../../models/interfaces/api/deck';
import { Router } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { ReadableDatePipe } from '../../../../shared/pipe/readable-date-pipe';
import { Faction } from '../../../../models/interfaces/api/faction';
import { HttpErrorResponse } from '@angular/common/http';
import { AUTHENTIFICATION_STATUT } from '../../../../constants/authentification-page.constantes';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { HOMEPAGE_LIBELLE } from '../../../../constants/homepage.constantes';
import { StateService } from '../../../../core/services/state/state-service';
import { DisplayingDeckZone } from '../../components/displaying-deck-zone/displaying-deck-zone';

@Component({
  selector: 'app-home-page',
  imports: [FeedbackPanel, DisplayingDeckZone],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private homepageFacade: HomepageFacade = inject(HomepageFacade);
  public stateService: StateService = inject(StateService);

  public recentDecks: WritableSignal<Array<Deck>> = signal<Array<Deck>>([]);

  public recentModifiedDecks: WritableSignal<Array<Deck>> = signal<Array<Deck>>([]);

  public factions: WritableSignal<Array<Faction>> = signal<Array<Faction>>([]);

  public feedBackData: WritableSignal<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = signal<{ statut: string; codeRetour: number; message: string }>({
    statut: '',
    codeRetour: 0,
    message: '',
  });

  public pageCards: WritableSignal<Page<Array<Card>>> = signal({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false,
  });

  private unsubscriber$ = new Subject<void>();

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public homepageLibelle: typeof HOMEPAGE_LIBELLE = HOMEPAGE_LIBELLE;

  ngOnInit() {
    this.homepageFacade
      .loadInitialLayout()
      .pipe(
        tap((initialData: [Page<Array<Deck>>, Page<Array<Deck>>, Array<Faction>]) => {
          this.recentDecks.set(initialData[0].content);
          this.recentModifiedDecks.set(initialData[1].content);
          this.factions.set(initialData[2]);
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
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public onLastDeckSelectChange(selection: {
    factionId: string;
    displayingType: 'CREATED' | 'MODIFIED';
  }): void {
    let recentDecksObservable$: Observable<Page<Array<Deck>>>;

    if (selection.displayingType === 'CREATED') {
      if (selection.factionId === '') {
        recentDecksObservable$ = from(this.homepageFacade.getFiveLastDeckCreated());
      } else {
        recentDecksObservable$ = from(
          this.homepageFacade.getFiveLastDeckCreatedByFactionId(selection.factionId)
        );
      }
    } else {
      if (selection.factionId === '') {
        recentDecksObservable$ = from(this.homepageFacade.getFiveLastDeckModified());
      } else {
        recentDecksObservable$ = from(
          this.homepageFacade.getFiveLastDeckModifiedByFactionId(selection.factionId)
        );
      }
    }

    recentDecksObservable$
      .pipe(
        tap((decks: Page<Array<Deck>>) => {
          if(selection.displayingType === "CREATED"){
            this.recentDecks.set(decks.content);
          } else {
            this.recentModifiedDecks.set(decks.content);
          }
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
  }
}
