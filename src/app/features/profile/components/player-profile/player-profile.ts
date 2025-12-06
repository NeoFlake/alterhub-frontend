import { Component, effect, inject, OnDestroy, WritableSignal } from '@angular/core';
import { PlayerProfileFacade } from '../../services/player-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { Player } from '../../../../models/interfaces/api/player';
import { StateService } from '../../../../core/services/state/state-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'player-profile',
  imports: [],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
})
export class PlayerProfile implements OnDestroy {

  public playerProfileFacade: PlayerProfileFacade = inject(PlayerProfileFacade);
  public stateService: StateService = inject(StateService);

  public userLogged: WritableSignal<User> = this.stateService.userLogged;

  private unsubscriber$ = new Subject<void>();

  public playerData!: Player | null;

  constructor(){
        this.playerProfileFacade.getPlayerByUserId(this.userLogged().id)
          .pipe(
            tap((player: Player) => {
              this.playerData = player ?? null;
            }),
            catchError((httpErrorResponse : HttpErrorResponse) => {
              console.log(httpErrorResponse);
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

}
