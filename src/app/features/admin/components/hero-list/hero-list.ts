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
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HERO_LIST_LIBELLE } from '../../../../constants/administration.constantes';
import { HeroDetailModal } from '../hero-detail-modal/hero-detail-modal';

@Component({
  selector: 'hero-list',
  imports: [HeroDetailModal],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {
  private heroManager: HeroManager = inject(HeroManager);

  public heroes: InputSignal<WritableSignal<Hero[]>> =
    input.required<WritableSignal<Array<Hero>>>();

  public isDisabled: InputSignal<boolean> = input.required<boolean>();

  public onUpdateAction: OutputEmitterRef<string> = output<string>();

  public detailedHero: WritableSignal<Hero | null> = signal<Hero|null>(null);

  private unsubscriber$ = new Subject<void>();

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
    { name: '', class: 'col-3 col-md-1' }
  ];

  public handleDeleteAction(heroId: string): void {
    this.heroManager
      .deleteHeroById(heroId)
      .pipe(
        tap(() => {
          this.heroes().update((heroes: Array<Hero>) => [
            ...heroes.filter((hero: Hero) => hero.id !== heroId),
          ]);
        }),
        catchError((error: HttpErrorResponse) => {
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

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

}
