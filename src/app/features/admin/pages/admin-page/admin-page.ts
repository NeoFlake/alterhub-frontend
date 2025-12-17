import { Component, inject } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { AlteredApiRepository } from '../../services/repository/altered-api.repository';
import { HeroForm } from '../../components/hero-form/hero-form';

@Component({
  selector: 'app-admin-page',
  imports: [HeroForm],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {

  
  private alteredApiRepository: AlteredApiRepository = inject(AlteredApiRepository);

  public synchronisationMessages: Array<string> = [];
  public synchronisationActivee: boolean = false;

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
        finalize(() => this.synchronisationMessages.push('Terminé !')),
        
      )
      .subscribe();
  }
}
