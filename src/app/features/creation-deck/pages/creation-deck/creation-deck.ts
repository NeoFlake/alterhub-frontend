import {
  Component,
  inject,
  model,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { MainDeckInfoForm } from '../../components/main-deck-info-form/main-deck-info-form';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Hero } from '../../../../models/interfaces/api/hero';
import { CreationDeckService } from '../../services/creation-deck-service';
import { catchError, finalize, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { Deck } from '../../../../models/interfaces/api/deck';
import { CardListDeck } from '../../components/card-list-deck/card-list-deck';
import { Card } from '../../../../models/interfaces/api/card';
import { Player } from '../../../../models/interfaces/api/player';
import { ActivatedRoute, Router } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';

@Component({
  selector: 'creation-deck',
  imports: [MainDeckInfoForm, FeedbackPanel, CardListDeck],
  templateUrl: './creation-deck.html',
  styleUrl: './creation-deck.css',
})
export class CreationDeck {
  private creationDeckService: CreationDeckService = inject(CreationDeckService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private unsubscriber$ = new Subject<void>();

  public feedBackPanel = signal<{ statut: string; codeRetour: number; message: string }>({
    statut: '',
    codeRetour: 0,
    message: '',
  });

  public existingData: WritableSignal<{ name: string; factionId: string; heroId: string }> =
    signal<{ name: string; factionId: string; heroId: string }>({
      name: '',
      factionId: '',
      heroId: '',
    });

  public factions: Array<Faction> = [];
  public heroes: Array<Hero> = [];

  public heroChoosen: Hero | null = null;
  public factionChoosen: Faction | null = null;

  // Détermine le mode d'utilisation de la vue
  public featureMode: 'CREATE' | 'UPDATE' = 'CREATE';

  // Utile pour le mode update de deck
  public deckToUpdate: Deck | null = null;
  public existingDeckList: WritableSignal<Array<Card>> = signal<Array<Card>>([]);

  public deckCreationPart: 1 | 2 = 1;

  // On initialise notre partial pour conserver les donneés entre les voyages entre
  // les vues de création du deck :)
  private deckToCreate: Partial<Deck> = {
    name: '',
  };

  ngOnInit() {
    const deckId = this.activatedRoute.snapshot.paramMap.get('id');

    this.creationDeckService
      .initialiseInfos()
      .pipe(
        tap((data: [heroes: Array<Hero>, factions: Array<Faction>, player: Player]) => {
          this.heroes = data[0];
          this.factions = data[1];
          this.deckToCreate.playerName = data[2].name;
          this.deckToCreate.tags = [];
        }),
        switchMap(() => {
          if (deckId) {
            this.featureMode = 'UPDATE';
            return this.creationDeckService.getDeckById(deckId);
          }
          return of(null);
        }),
        tap((deckToUpdate: Deck | null) => {
          if (deckToUpdate) {
            this.deckToUpdate = deckToUpdate;
            this.existingData.set({
              name: deckToUpdate.name,
              factionId: deckToUpdate.faction.id,
              heroId: deckToUpdate.hero.id!,
            });
            this.existingDeckList.set(deckToUpdate.cards);
          }
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.feedBackPanel.set({
            statut: AUTHENTIFICATION_STATUT.ERROR,
            codeRetour: httpErrorResponse.error.status,
            message: httpErrorResponse.error.message,
          });
          return [];
        }),
        finalize(() =>
          setTimeout(() => {
            this.feedBackPanel.set({
              statut: '',
              codeRetour: 0,
              message: '',
            });
          }, 1500)
        ),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public onActivateSecondStep(
    firstPartOfInfo: Partial<{ name: string; faction: Faction; hero: Hero }>
  ): void {
    this.deckToCreate.name = firstPartOfInfo.name;
    this.deckToCreate.faction = firstPartOfInfo.faction;
    this.factionChoosen = firstPartOfInfo.faction!;
    this.deckToCreate.hero = firstPartOfInfo.hero;
    this.heroChoosen = firstPartOfInfo.hero!;
    if (
      this.featureMode === 'CREATE' ||
      (this.featureMode === 'UPDATE' && this.deckToCreate.name !== this.existingData().name)
    ) {
      this.creationDeckService
        .existDeckByName(this.deckToCreate.name!)
        .pipe(
          tap((existByName: boolean) => {
            if (!existByName) {
              if (this.featureMode === 'UPDATE') {
                if (this.factionChoosen!.id !== this.deckToUpdate!.faction.id) {
                  this.existingDeckList.set([]);
                }
              }
              this.deckCreationPart = 2;
            } else {
              this.feedBackPanel.set({
                statut: AUTHENTIFICATION_STATUT.ERROR,
                codeRetour: 0,
                message: 'Ce nom de deck est déjà pris',
              });
              setTimeout(() => {
                this.feedBackPanel.set({
                  statut: '',
                  codeRetour: 0,
                  message: '',
                });
              }, 2000);
            }
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            this.feedBackPanel.set({
              statut: AUTHENTIFICATION_STATUT.ERROR,
              codeRetour: httpErrorResponse.error.status,
              message: httpErrorResponse.error.message,
            });
            return [];
          }),
          finalize(() =>
            setTimeout(() => {
              this.feedBackPanel.set({
                statut: '',
                codeRetour: 0,
                message: '',
              });
            }, 1500)
          ),
          takeUntil(this.unsubscriber$)
        )
        .subscribe();
    } else {
      if (this.factionChoosen.id !== this.deckToUpdate!.faction.id) {
        this.existingDeckList.set([]);
      }
      this.deckCreationPart = 2;
    }
  }

  public onValidateDeckList(deckList: Array<Card>): void {
    const now: Date = new Date();
    this.deckToCreate.cards = deckList;
    this.deckToCreate.lastModification = now;

    if (this.featureMode === 'CREATE') {
      this.deckToCreate.dateOfCreation = now.toISOString().slice(0, 10);
      this.creationDeckService
        .addDeck(this.deckToCreate)
        .pipe(
          tap((deck: Deck) =>
            this.feedBackPanel.set({
              statut: AUTHENTIFICATION_STATUT.SUCCESS,
              codeRetour: 200,
              message: FEEDBACK_PANEL_MESSAGES.ADD_DECK_SUCCESS,
            })
          ),
          switchMap(() => timer(2000)),
          tap(() => {
            this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.MINE]);
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            this.feedBackPanel.set({
              statut: AUTHENTIFICATION_STATUT.ERROR,
              codeRetour: httpErrorResponse.error.status,
              message: httpErrorResponse.error.message,
            });
            return of(null);
          }),
          finalize(() =>
            this.feedBackPanel.set({
              statut: '',
              codeRetour: 0,
              message: '',
            })
          ),
          takeUntil(this.unsubscriber$)
        )
        .subscribe();
    } else if (this.featureMode === 'UPDATE') {
      this.deckToCreate.id = this.deckToUpdate!.id;
      (this.deckToCreate.dateOfCreation = this.deckToUpdate!.dateOfCreation),
        this.creationDeckService
          .updateDeckById(this.deckToCreate, this.deckToUpdate!.id!)
          .pipe(
            tap((deck: Deck) =>
              this.feedBackPanel.set({
                statut: AUTHENTIFICATION_STATUT.SUCCESS,
                codeRetour: 200,
                message: FEEDBACK_PANEL_MESSAGES.UPDATE_DECK_SUCCESS,
              })
            ),
            switchMap(() => timer(2000)),
            tap(() => {
              this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.MINE]);
            }),
            catchError((httpErrorResponse: HttpErrorResponse) => {
              this.feedBackPanel.set({
                statut: AUTHENTIFICATION_STATUT.ERROR,
                codeRetour: httpErrorResponse.error.status,
                message: httpErrorResponse.error.message,
              });
              return of(null);
            }),
            finalize(() =>
              this.feedBackPanel.set({
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

  public onCancelClick(): void {
    this.deckCreationPart = 1;
  }

}
