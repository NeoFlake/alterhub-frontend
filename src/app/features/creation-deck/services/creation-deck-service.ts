import { inject, Injectable } from '@angular/core';
import { Faction } from '../../../models/interfaces/api/faction';
import { Hero } from '../../../models/interfaces/api/hero';
import { forkJoin, Observable } from 'rxjs';
import { HeroRepository } from '../../../core/services/api/backend/hero.repository';
import { FactionRepository } from '../../../core/services/api/backend/faction.repository';
import { CardsRepository } from '../../../core/services/api/backend/cards.repository';
import { Card } from '../../../models/interfaces/api/card';
import { Page } from '../../../models/interfaces/api/page';
import { PlayerRepository } from '../../../core/services/api/backend/player.repository';
import { StateService } from '../../../core/services/state/state-service';
import { Player } from '../../../models/interfaces/api/player';
import { Deck } from '../../../models/interfaces/api/deck';
import { DeckRepository } from '../../../core/services/api/backend/deck.repository';

@Injectable({
  providedIn: 'root',
})
export class CreationDeckService {
  private heroRepository: HeroRepository = inject(HeroRepository);
  private factionRepository: FactionRepository = inject(FactionRepository);
  private cardsRepository: CardsRepository = inject(CardsRepository);
  private playerRepository: PlayerRepository = inject(PlayerRepository);
  private deckRepository: DeckRepository = inject(DeckRepository);
  private stateService: StateService = inject(StateService);

  public initialiseInfos(): Observable<[heros: Array<Hero>, factions: Array<Faction>, player: Player]> {
    return forkJoin([this.heroRepository.getAllHeroes(), this.factionRepository.getAllFactions(), this.playerRepository.getPlayerByUserId(this.stateService.userLogged().id)]);
  }

  public getCardsByFactionId(factionId: string, pageNumber: number): Observable<Page<Array<Card>>> {
    return this.cardsRepository.getCardsByFactionId(factionId, pageNumber, 16);
  }

  public addDeck(deck: Partial<Deck>): Observable<Deck> {
    const deckToSave: Deck = {
      name: deck.name!,
      playerName: deck.playerName!,
      faction: deck.faction!,
      hero: deck.hero!,
      cards: deck.cards!,
      dateOfCreation: deck.dateOfCreation!,
      lastModification: deck.lastModification!,
      tags: deck.tags!
    }
    return this.deckRepository.addDeck(deckToSave);
  }

}
