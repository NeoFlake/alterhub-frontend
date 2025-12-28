import { Component, inject, model, ModelSignal, signal, WritableSignal } from '@angular/core';
import { HeroForm } from '../../components/hero-form/hero-form';
import { AlteredApiSynchronisation } from '../../components/altered-api-synchronisation/altered-api-synchronisation';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HeroManager } from '../../services/hero-manager';
import { map } from 'rxjs';
import { HeroList } from '../../components/hero-list/hero-list';
import { FeedbackPanel } from '../../../../shared/components/feedback-panel/feedback-panel';

@Component({
  selector: 'app-admin-page',
  imports: [HeroForm, AlteredApiSynchronisation, HeroList, FeedbackPanel],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  public heroManager: HeroManager = inject(HeroManager);

  public heroes: WritableSignal<Array<Hero>> = signal<Array<Hero>>([]);

  public updateHeroId: WritableSignal<string> = signal<string>('');

  public disableIcon: WritableSignal<boolean> = signal<boolean>(false);

  public feedBackData: ModelSignal<{
    statut: string;
    codeRetour: number;
    message: string;
  }> = model<{ statut: string; codeRetour: number; message: string }>({
    statut: '',
    codeRetour: 0,
    message: '',
  });

  ngOnInit() {
    this.heroManager
      .getAllHeroes()
      .pipe(
        map((heroes: Array<Hero>) =>
          this.heroes.set(
            heroes.sort((a: Hero, b: Hero) => {
              const factionCompare = a.faction.name.localeCompare(b.faction.name);
              if (factionCompare !== 0) return factionCompare;
              return a.name.localeCompare(b.name);
            })
          )
        )
      )
      .subscribe();
  }

  public onUpdateAction(heroId: string): void {
    this.updateHeroId.set(heroId);
    this.disableIcon.set(true);
  }

  public onUpdateDone(): void {
    this.disableIcon.set(false);
  }

  public handleFeedBackForm(feedBackData: { statut: string; codeRetour: number; message: string }) {
    this.feedBackData.set(feedBackData);
  }
}
