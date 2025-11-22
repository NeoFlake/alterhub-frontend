import { inject, Injectable } from '@angular/core';
import { PlayerRepository } from '../../../core/services/api/backend/player.repository';
import { Observable } from 'rxjs';
import { Player } from '../../../models/interfaces/api/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerProfileFacade {

  private playerRepository: PlayerRepository = inject(PlayerRepository);

  public getPlayerByUserId(userId: string): Observable<Player> {
    return this.playerRepository.getPlayerByUserId(userId);
  }
  
}
