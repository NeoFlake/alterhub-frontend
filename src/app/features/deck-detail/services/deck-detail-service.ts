import { inject, Injectable } from '@angular/core';
import { DeckRepository } from '../../../core/services/api/backend/deck.repository';
import { Observable } from 'rxjs';
import { Deck } from '../../../models/interfaces/api/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckDetailService {

  public deckRepository: DeckRepository = inject(DeckRepository);

  public getDeckById(deckId: string): Observable<Deck> {
    return this.deckRepository.getDeckById(deckId);
  }
  
}
