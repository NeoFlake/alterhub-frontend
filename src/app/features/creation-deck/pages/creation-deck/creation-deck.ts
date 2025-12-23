import { Component, inject, model, output, OutputEmitterRef } from '@angular/core';
import { MainDeckInfoForm } from '../../components/main-deck-info-form/main-deck-info-form';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Hero } from '../../../../models/interfaces/api/hero';
import { CreationDeckService } from '../../services/creation-deck-service';
import { catchError, finalize, Subject, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AUTHENTIFICATION_STATUT } from '../../../../constants/authentification-page.constantes';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';
import { Deck } from '../../../../models/interfaces/api/deck';

@Component({
  selector: 'creation-deck',
  imports: [MainDeckInfoForm, FeedbackPanel],
  templateUrl: './creation-deck.html',
  styleUrl: './creation-deck.css',
})
export class CreationDeck {

  private creationDeckService: CreationDeckService = inject(CreationDeckService);

  private unsubscriber$ = new Subject<void>();

  public feedBackPanel= model<{ statut: string; codeRetour: number; message: string }>({
    statut: "",
    codeRetour: 0,
    message: ""
  });

  public factions: Array<Faction> = [];
  public heroes: Array<Hero> = [];

  public deckCreationPart: 1 | 2 = 1;

  // On initialise notre partial pour conserver les donneés entre les voyages entre
  // les vues de création du deck :)
  private deckToCreate: Partial<Deck> = {
    name: ""
  };

  ngOnInit() {
    this.creationDeckService
      .initialiseInfos()
      .pipe(
        tap((data: [heroes: Array<Hero>, factions: Array<Faction>]) => {
          console.log(data[0]);
          console.log(data[1]);
          this.heroes = data[0];
          this.factions = data[1];
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.feedBackPanel.set({
            statut: AUTHENTIFICATION_STATUT.ERROR,
            codeRetour: httpErrorResponse.error.status,
            message: httpErrorResponse.error.message,
          });
          return [];
        }),
        finalize(() =>
          setTimeout(() => {
            this.feedBackPanel.set({
            statut: "",
            codeRetour: 0,
            message: "",
          });
          }, 1500)
        ),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public onActivateSecondStep(firstPartOfInfo: Partial<{name: string, faction: Faction, hero: Hero}>) {
    this.deckToCreate.name = firstPartOfInfo.name;
    this.deckToCreate.faction = firstPartOfInfo.faction;
    this.deckToCreate.hero = firstPartOfInfo.hero;
    this.deckCreationPart = 2;
  }

}
