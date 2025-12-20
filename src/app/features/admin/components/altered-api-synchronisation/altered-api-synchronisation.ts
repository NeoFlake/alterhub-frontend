import { Component, inject } from '@angular/core';
import { tap, catchError, EMPTY, finalize } from 'rxjs';
import { ADMINISTRATION_LIBELLE } from '../../../../constants/administration.constantes';
import { AlteredApiRepository } from '../../services/repository/altered-api.repository';

@Component({
  selector: 'altered-api-synchronisation',
  imports: [],
  templateUrl: './altered-api-synchronisation.html',
  styleUrl: './altered-api-synchronisation.css',
})
export class AlteredApiSynchronisation {
  private alteredApiRepository: AlteredApiRepository = inject(AlteredApiRepository);

  public synchronisationMessages: Array<string> = [];
  public synchronisationActivee: boolean = false;

  public adminLibelle: typeof ADMINISTRATION_LIBELLE = ADMINISTRATION_LIBELLE;

  public handleSynchronize(): void {
    this.synchronisationMessages = [];
    this.synchronisationActivee = true;
    this.alteredApiRepository
      .refreshCardDatabase()
      .pipe(
        tap((msg) => this.synchronisationMessages.push(msg)),
        catchError((error: any) => {
          // Merci Angular de ce any <3
          this.synchronisationMessages.push(
            'Erreur : ' + (error instanceof Error ? error.message : 'Unknown error')
          );
          // Retour d’un flux vide pour finir sans bloquer
          return EMPTY;
        }),
        finalize(() => this.synchronisationMessages.push('Terminé !'))
      )
      .subscribe();
  }
}
