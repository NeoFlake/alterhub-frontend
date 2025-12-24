import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_DECKS } from '../../../../constants/backend-api-road';
import { Deck } from '../../../../models/interfaces/api/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckRepository {

  private http: HttpClient = inject(HttpClient);

  public addDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(`${BACKEND_API_DECKS.ROOT}`, deck);
  }
  
}
