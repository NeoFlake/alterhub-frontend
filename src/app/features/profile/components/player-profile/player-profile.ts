import { Component, effect, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { PlayerProfileFacade } from '../../services/player-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { catchError, finalize, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { Player } from '../../../../models/interfaces/api/player';
import { StateService } from '../../../../core/services/state/state-service';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { PROFILE_LIBELLE } from '../../../../constants/profile-page.constantes';
import { Router } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';
import { ConfirmDeletionModal } from '../../../../shared/components/confirm-deletion-modal/confirm-deletion-modal';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { Deck } from '../../../../models/interfaces/api/deck';
import { DELETE_MODAL_DATA } from '../../../../constants/deck-list.constants';
import { DeckListService } from '../../../deck-list/services/deck-list-service';
import {
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';
import { Page } from '../../../../models/interfaces/api/page';

@Component({
  selector: 'player-profile',
  imports: [ConfirmDeletionModal, FeedbackPanel],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
})
export class PlayerProfile implements OnDestroy {
  public playerProfileFacade: PlayerProfileFacade = inject(PlayerProfileFacade);
  public stateService: StateService = inject(StateService);
  public deckListService: DeckListService = inject(DeckListService);
  public router: Router = inject(Router);

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

  public userLogged: WritableSignal<User> = this.stateService.userLogged;

  private unsubscriber$ = new Subject<void>();

  public playerData: WritableSignal<Player | null> = signal<Player | null>(null);

  public deleteModalData: { title: string; body: string } = {
    title: '',
    body: '',
  };

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public profileLibelle: typeof PROFILE_LIBELLE = PROFILE_LIBELLE;

  constructor() {
    this.playerProfileFacade
      .getPlayerByUserId(this.userLogged().id)
      .pipe(
        tap((player: Player) => {
          this.playerData.set(player ?? null);
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

  // Détermine spécifiquement le style nécessaire pour chaque
  // ligne du tableau en fonction de la faction
  public getFactionColorRowStyle(color: string): {
    background: string;
    'border-left': string;
  } {
    // On va créer un joli dégradé en faisant un échantillonage de deux couleurs
    // en fonction de notre couleur de départ
    const startColor = color + '20';
    const endColor = color + '00';
    // Puis une troisième pour pouvoir démarquer notre bordure gauche
    const borderColor = color + '40';

    return {
      background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 85%)`,
      'border-left': `4px solid ${borderColor}`,
    };
  }

  public viewDeckDetail(deckId: string): void {
    this.router.navigate([DECK_ROAD.ROOT, deckId]);
  }

  public updateDeck(deckId: string): void {
    this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.CREATE, deckId]);
  }

  public deleteDeck(deck: Deck): void {
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
            this.playerData.update((playerProfile: Player | null) => {
              if (!playerProfile) {
                return null;
              }
              return {
                ...playerProfile,
                decks: playerProfile.decks.filter((deck: Deck) => deck.id !== this.deckToDelete()),
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

  public redirectionToCreateDeck(): void {
    this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.CREATE]);
  }
}
