import { Component, inject, OnInit } from '@angular/core';
import { TypeManager } from '../../services/type-manager';
import { tap } from 'rxjs';
import { Type } from '../../../../models/interfaces/type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {

  private typeManager: TypeManager = inject(TypeManager);

  ngOnInit(): void {
      this.typeManager.fetchAllTypes()
      .pipe(
        tap((types: Array<Type>) => console.log(types))
      )
      .subscribe({
        error: (error: Error) => console.error(error)
      });

      this.typeManager.fetchTypeById("3fa85f64-5717-4562-b3fc-2c963f66afa6")
      .pipe(
        tap((type: Type) => console.log("Impossible que j'arrive ici"))
      )
      .subscribe({
        error: (httpErrorResponse: HttpErrorResponse) => console.log(`${httpErrorResponse.error.status} : ${httpErrorResponse.error.message}`, httpErrorResponse)
      });
  }

}
