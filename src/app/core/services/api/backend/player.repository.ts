import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../../../models/interfaces/api/player';
import { BACKEND_API_PLAYERS } from '../../../../constants/backend-api-road';

@Injectable({
  providedIn: 'root',
})
export class PlayerRepository {

  private http: HttpClient = inject(HttpClient);

  public getPlayerByUserId(userId: string): Observable<Player>{
    return this.http.get<Player>(`${BACKEND_API_PLAYERS.BY_USER_ID}/${userId}`);
  }
  
}
