import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Card } from '../../../../models/interfaces/api/card';
import { Observable } from 'rxjs';
import { BACKEND_API_CARDS } from '../../../../constants/backend-api-road';
import { Page } from '../../../../models/interfaces/api/page';

@Injectable({
  providedIn: 'root',
})
export class CardsRepository {

  private http: HttpClient = inject(HttpClient);

  public getCards(page: number, size: number): Observable<Page<Array<Card>>> {
    return this.http.get<Page<Array<Card>>>(`${BACKEND_API_CARDS.ROOT}?page=${page}&size=${size}`);
  }
  
}
