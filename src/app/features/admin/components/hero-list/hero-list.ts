import {
  Component,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HeroManager } from '../../services/hero-manager';
import { catchError, finalize, of, Subject, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HERO_LIST_LIBELLE } from '../../../../constants/administration.constantes';
import { HeroDetailModal } from '../hero-detail-modal/hero-detail-modal';
import {
  AUTHENTIFICATION_STATUT,
  FEEDBACK_PANEL_MESSAGES,
} from '../../../../constants/authentification-page.constantes';
import { ConfirmDeletionModal } from '../../../../shared/components/confirm-deletion-modal/confirm-deletion-modal';

@Component({
  selector: 'hero-list',
  imports: [HeroDetailModal, ConfirmDeletionModal],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {
  private heroManager: HeroManager = inject(HeroManager);

  public heroes: InputSignal<WritableSignal<Hero[]>> =
    input.required<WritableSignal<Array<Hero>>>();

  public isDisabled: InputSignal<boolean> = input.required<boolean>();

  public onUpdateAction: OutputEmitterRef<string> = output<string>();

  public feedbackPanelData: OutputEmitterRef<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = output<{ statut: string; codeRetour: number; message: string }>();

  public detailedHero: WritableSignal<Hero | null> = signal<Hero | null>(null);

  public heroToDelete: WritableSignal<Hero | null> = signal<Hero | null>(null);

  private unsubscriber$ = new Subject<void>();

  public deleteModalData: { title: string; body: string } = {
    title: '',
    body: '',
  };

  public heroListLibelle: typeof HERO_LIST_LIBELLE = HERO_LIST_LIBELLE;

  public isColored: boolean = false;

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public columnsToDisplay: Array<{ name: string; class: string }> = [
    { name: this.heroListLibelle.COLUMNS.COLORIZE, class: 'col-3 col-md-2' },
    { name: this.heroListLibelle.COLUMNS.NAME, class: 'col-3' },
    { name: this.heroListLibelle.COLUMNS.FACTION, class: 'col-3 col-md-2' },
    { name: this.heroListLibelle.COLUMNS.RESERVE_SLOT, class: 'd-none d-md-block col-md-2' },
    { name: this.heroListLibelle.COLUMNS.LANDMARK_SLOT, class: 'd-none d-md-block col-md-2' },
    { name: '', class: 'col-3 col-md-1' },
  ];

  public handleUpdateAction(heroId: string): void {
    this.onUpdateAction.emit(heroId);
  }

  public switchColorisationMode(): void {
    this.isColored = !this.isColored;
  }

  public showHeroDetails(hero: Hero): void {
    this.detailedHero.set(hero);
  }

  public onModalClose(): void {
    this.detailedHero.set(null);
  }

  public onDeleteAction(hero: Hero): void {
    this.deleteModalData.title = `${this.heroListLibelle.DELETE_MODAL_DATA.TITLE}${hero.name}`;
    this.deleteModalData.body = `${this.heroListLibelle.DELETE_MODAL_DATA.BODY}${hero.name}`;
    this.heroToDelete.set(hero);
  }

  public onConfirmDeletionModalClose(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.heroManager
        .deleteHeroById(this.heroToDelete()!.id!)
        .pipe(
          tap(() => {
            this.heroes().update((heroes: Array<Hero>) => [
              ...heroes.filter((hero: Hero) => hero.id !== this.heroToDelete()!.id!),
            ]);
            this.feedbackPanelData.emit({
              statut: AUTHENTIFICATION_STATUT.SUCCESS,
              codeRetour: 200,
              message: FEEDBACK_PANEL_MESSAGES.DELETE_HERO_SUCCESS,
            });
          }),
          catchError((httpErrorResponse: HttpErrorResponse) => {
            this.feedbackPanelData.emit({
              statut: AUTHENTIFICATION_STATUT.ERROR,
              codeRetour: httpErrorResponse.error.status,
              message: httpErrorResponse.error.message,
            });
            return of(null);
          }),
          finalize(() => {
            setTimeout(() => {
              this.feedbackPanelData.emit({
                statut: '',
                codeRetour: 0,
                message: '',
              });
            }, 2500);
          }),
          takeUntil(this.unsubscriber$)
        )
        .subscribe();
    } else {
      this.heroToDelete.set(null);
      this.feedbackPanelData.emit({
        statut: AUTHENTIFICATION_STATUT.SUCCESS,
        codeRetour: 200,
        message: FEEDBACK_PANEL_MESSAGES.CANCEL_DELETE_USER,
      });
      setTimeout(() => {
        this.feedbackPanelData.emit({
          statut: '',
          codeRetour: 0,
          message: '',
        });
      }, 2000);
    }
  }
}
