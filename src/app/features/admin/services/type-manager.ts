import { inject, Injectable } from '@angular/core';
import { TypeRepository } from '../../../core/services/api/backend/type.repository';
import { Observable } from 'rxjs';
import { Type } from '../../../models/interfaces/api/type';

@Injectable({
  providedIn: 'root',
})
export class TypeManager {
  
  private typeRepository: TypeRepository = inject(TypeRepository);

  public fetchAllTypes(): Observable<Array<Type>> {
    return this.typeRepository.getAllTypes();
  }

  public fetchTypeById(id: string): Observable<Type> {
    return this.typeRepository.getTypeById(id);
  }

  public postNewType(type: Type): Observable<Type> {
    return this.typeRepository.addType(type);
  }

}
