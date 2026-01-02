import { inject, Injectable } from '@angular/core';
import { CardsRepository } from '../../../core/services/api/backend/cards.repository';
import { forkJoin, Observable } from 'rxjs';
import { Card } from '../../../models/interfaces/api/card';
import { Page } from '../../../models/interfaces/api/page';
import { DeckRepository } from '../../../core/services/api/backend/deck.repository';
import { Deck } from '../../../models/interfaces/api/deck';
import { FactionRepository } from '../../../core/services/api/backend/faction.repository';
import { Faction } from '../../../models/interfaces/api/faction';

@Injectable({
  providedIn: 'root',
})
export class HomepageFacade {

  private cardsRepository: CardsRepository = inject(CardsRepository);
  private decksRepository: DeckRepository = inject(DeckRepository);
  private factionRepository: FactionRepository = inject(FactionRepository);

  public loadInitialLayout(): Observable<[Page<Array<Deck>>, Page<Array<Deck>>, Array<Faction>]> {
    return forkJoin([this.getFiveLastDeckCreated(), this.getFiveLastDeckModified(), this.allFactions()]);
  }

  public getPageCards(pageNumber: number): Observable<Page<Array<Card>>> {
    return this.cardsRepository.getCards(pageNumber, 200);
  }

  public allFactions(): Observable<Array<Faction>> {
    return this.factionRepository.getAllFactions();
  }

  public getFiveLastDeckCreated(): Observable<Page<Array<Deck>>> {
    return this.decksRepository.getFiveLastDeckCreated(0, 5);
  }

  public getFiveLastDeckCreatedByFactionId(factionId: string): Observable<Page<Array<Deck>>> {
    return this.decksRepository.getFiveLastDeckCreatedByFactionId(factionId, 0, 5);
  }

  public getFiveLastDeckModified(): Observable<Page<Array<Deck>>> {
    return this.decksRepository.getFiveLastDeckCreated(0, 5);
  }

  public getFiveLastDeckModifiedByFactionId(factionId: string): Observable<Page<Array<Deck>>> {
    return this.decksRepository.getFiveLastDeckCreatedByFactionId(factionId, 0, 5);
  }
  
}
