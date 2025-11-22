import { Component, inject, OnDestroy } from '@angular/core';
import { PlayerProfileFacade } from '../../services/player-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { Subject, takeUntil, tap } from 'rxjs';
import { Player } from '../../../../models/interfaces/api/player';

@Component({
  selector: 'player-profile',
  imports: [],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
})
export class PlayerProfile implements OnDestroy {

  public playerProfileFacade: PlayerProfileFacade = inject(PlayerProfileFacade);

  public userLogged: User;

  private unsubscriber$ = new Subject<void>();

  constructor(){

    console.log(localStorage.getItem("loggedInfo")!);

    this.userLogged = JSON.parse(localStorage.getItem("loggedInfo")!);
    this.playerProfileFacade.getPlayerByUserId(this.userLogged.id)
    .pipe(
      tap((player: Player) => console.log(player)),
      takeUntil(this.unsubscriber$)
    )
    .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

}
