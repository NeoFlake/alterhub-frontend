import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Observable } from 'rxjs';
import { BACKEND_API_FACTIONS } from '../../../../constants/backend-api-road';

@Injectable({
  providedIn: 'root',
})
export class FactionRepository {

  private http: HttpClient = inject(HttpClient);

  public getAllFactions(): Observable<Array<Faction>> {
    return this.http.get<Array<Faction>>(`${BACKEND_API_FACTIONS.ROOT}`);
  }

  public getFactionById(id: string): Observable<Faction> {
    return this.http.get<Faction>(`${BACKEND_API_FACTIONS.ROOT}/${id}`);
  }
  
}
