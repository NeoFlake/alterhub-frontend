import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../../../../models/interfaces/type';
import { BACKEND_API_TYPES } from '../../../../constants/backend-api-road';

@Injectable({
  providedIn: 'root',
})
export class TypeRepository {
  
  public http: HttpClient = inject(HttpClient);

  public getAllTypes(): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(`${BACKEND_API_TYPES.ROOT}`);
  }

  public getTypeById(id: string): Observable<Type> {
    return this.http.get<Type>(`${BACKEND_API_TYPES.ROOT}/${id}`);
  }

}
