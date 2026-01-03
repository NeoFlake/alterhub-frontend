import { inject, Injectable } from '@angular/core';
import { DeckRepository } from '../../../core/services/api/backend/deck.repository';
import { Observable, switchMap } from 'rxjs';
import { Deck } from '../../../models/interfaces/api/deck';
import { Page } from '../../../models/interfaces/api/page';
import { StateService } from '../../../core/services/state/state-service';
import { PlayerRepository } from '../../../core/services/api/backend/player.repository';
import { Player } from '../../../models/interfaces/api/player';

@Injectable({
  providedIn: 'root',
})
export class DeckListService {

  private deckRepository: DeckRepository = inject(DeckRepository);
  private stateService: StateService = inject(StateService);
  private playerRepository: PlayerRepository = inject(PlayerRepository);

  public getAllDecks(): Observable<Page<Array<Deck>>> {
    return this.deckRepository.getDecks(0, 200);
  }

  public getAllUserDecks(): Observable<Page<Array<Deck>>> {
    return this.playerRepository.getPlayerByUserId(this.stateService.userLogged().id)
    .pipe(
      switchMap((player: Player) => {
        return this.deckRepository.getDecksByPlayerId(player.id, 0, 200);
      })
    )
  }

  public deleteDeckById(deckId: string): Observable<void> {
    return this.deckRepository.deleteDeckById(deckId);
  }
  
}
