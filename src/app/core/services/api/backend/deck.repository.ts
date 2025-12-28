import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_DECKS, BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Deck } from '../../../../models/interfaces/api/deck';
import { Page } from '../../../../models/interfaces/api/page';

@Injectable({
  providedIn: 'root',
})
export class DeckRepository {
  private http: HttpClient = inject(HttpClient);

  public getDecks(page: number, size: number): Observable<Page<Array<Deck>>> {
    return this.http.get<Page<Array<Deck>>>(`${BACKEND_API_DECKS.ROOT}?page=${page}&size=${size}`);
  }

  public getDeckById(deckId: string): Observable<Deck> {
    return this.http.get<Deck>(`${BACKEND_API_DECKS.ROOT}/${deckId}`);
  }

  public getDecksByPlayerId(playerId: string, page: number, size: number): Observable<Page<Array<Deck>>> {
    return this.http.get<Page<Array<Deck>>>(`${BACKEND_API_DECKS.ROOT}${BACKEND_API_ROADS.PLAYERS}/${playerId}?page=${page}&size=${size}`);
  }

  public existDeckByName(deckName: string): Observable<boolean> {
    return this.http.get<boolean>(`${BACKEND_API_DECKS.EXIST_BY_NAME}/${deckName}`);
  }

  public addDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(`${BACKEND_API_DECKS.ROOT}`, deck);
  }

  public deleteDeckById(deckId: string): Observable<void> {
    return this.http.delete<void>(`${BACKEND_API_DECKS.ROOT}/${deckId}`);
  }

  public updateDeckById(deck: Deck, deckId: string): Observable<Deck> {
    return this.http.put<Deck>(`${BACKEND_API_DECKS.ROOT}/${deckId}`, deck);
  }

}
