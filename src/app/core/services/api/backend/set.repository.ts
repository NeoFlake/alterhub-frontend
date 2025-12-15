import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../../../../models/interfaces/api/set';
import { BACKEND_API_SETS } from '../../../../constants/backend-api-road';

@Injectable({
  providedIn: 'root',
})
export class SetRepository {

  private http: HttpClient = inject(HttpClient);

  public getAllSets(): Observable<Array<Set>> {
    return this.http.get<Array<Set>>(`${BACKEND_API_SETS.ROOT}`);
  }

  public getSetById(id: string): Observable<Set> {
    return this.http.get<Set>(`${BACKEND_API_SETS.ROOT}/${id}`);
  }
  
}
