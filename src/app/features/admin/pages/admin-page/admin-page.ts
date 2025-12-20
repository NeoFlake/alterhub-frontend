import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeroForm } from '../../components/hero-form/hero-form';
import { AlteredApiSynchronisation } from '../../components/altered-api-synchronisation/altered-api-synchronisation';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HeroManager } from '../../services/hero-manager';
import { map } from 'rxjs';
import { HeroList } from '../../components/hero-list/hero-list';

@Component({
  selector: 'app-admin-page',
  imports: [HeroForm, AlteredApiSynchronisation, HeroList],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {

  public heroManager: HeroManager = inject(HeroManager);

  public heroes: WritableSignal<Array<Hero>> = signal<Array<Hero>>([]);

  public updateHeroId: string = "";

  ngOnInit(){
    this.heroManager.getAllHeroes()
    .pipe(
      map((heroes: Array<Hero>) => this.heroes.set(heroes))
    )
    .subscribe();
  }

  public onUpdateAction(heroId: string): void {
    this.updateHeroId = heroId;
  }
  
}
