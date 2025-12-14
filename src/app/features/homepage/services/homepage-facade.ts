import { inject, Injectable } from '@angular/core';
import { CardsRepository } from '../../../core/services/api/backend/cards.repository';
import { Observable } from 'rxjs';
import { Card } from '../../../models/interfaces/api/card';
import { Page } from '../../../models/interfaces/api/page';

@Injectable({
  providedIn: 'root',
})
export class HomepageFacade {

  private cardsRepository: CardsRepository = inject(CardsRepository);

  public getPageCards(pageNumber: number): Observable<Page<Array<Card>>> {
    return this.cardsRepository.getCards(pageNumber, 40);
  }
  
}
