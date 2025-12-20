import { Component, inject, input, InputSignal, output, OutputEmitterRef, WritableSignal } from '@angular/core';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HeroManager } from '../../services/hero-manager';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hero-list',
  imports: [],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {

  private heroManager: HeroManager = inject(HeroManager);

  public heroes: InputSignal<WritableSignal<Hero[]>> =
    input.required<WritableSignal<Array<Hero>>>();

  public onUpdateAction: OutputEmitterRef<string> = output<string>();

  private unsubscriber$ = new Subject<void>();

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public columnsToDisplay: Array<{ name: string; class: string }> = [
    { name: '', class: 'col-2' },
    { name: 'Nom', class: 'col-2' },
    { name: 'Faction', class: 'col-2' },
    { name: 'Emplacements', class: 'col-2' },
    { name: 'Effet', class: 'col-4' },
  ];

  public handleDeleteAction(heroId: string): void {
    this.heroManager.deleteHeroById(heroId)
    .pipe(
      tap(() => {
        this.heroes().update((heroes: Array<Hero>) => {
          return heroes.filter((hero: Hero) => hero.id !== heroId);
        });
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

}
