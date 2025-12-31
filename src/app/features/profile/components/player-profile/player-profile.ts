import { Component, effect, inject, OnDestroy, WritableSignal } from '@angular/core';
import { PlayerProfileFacade } from '../../services/player-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { Player } from '../../../../models/interfaces/api/player';
import { StateService } from '../../../../core/services/state/state-service';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { PROFILE_LIBELLE } from '../../../../constants/profile-page.constantes';
import { Router } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';

@Component({
  selector: 'player-profile',
  imports: [],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
})
export class PlayerProfile implements OnDestroy {
  public playerProfileFacade: PlayerProfileFacade = inject(PlayerProfileFacade);
  public stateService: StateService = inject(StateService);
  public router: Router = inject(Router);

  public userLogged: WritableSignal<User> = this.stateService.userLogged;

  private unsubscriber$ = new Subject<void>();

  public playerData!: Player | null;

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public profileLibelle: typeof PROFILE_LIBELLE = PROFILE_LIBELLE;

  constructor() {
    this.playerProfileFacade
      .getPlayerByUserId(this.userLogged().id)
      .pipe(
        tap((player: Player) => {
          this.playerData = player ?? null;
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.playerData = null;
          return of(null);
        }),
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
    'background': string;
    'border-left': string;
  } {

    // On va créer un joli dégradé en faisant un échantillonage de deux couleurs
    // en fonction de notre couleur de départ
    const startColor = color + '20';
    const endColor = color + '00';
    // Puis une troisième pour pouvoir démarquer notre bordure gauche
    const borderColor = color + '40';

    return {
      'background': `linear-gradient(90deg, ${startColor} 0%, ${endColor} 85%)`,
      'border-left': `4px solid ${borderColor}`,
    };
  }

  public viewDeckDetail(deckId: string): void {
    this.router.navigate([DECK_ROAD.ROOT, deckId]);
  }

  public updateDeck(deckId: string): void {
    this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.CREATE, deckId])
  }

}
