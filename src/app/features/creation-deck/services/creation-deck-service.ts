import { inject, Injectable } from '@angular/core';
import { Faction } from '../../../models/interfaces/api/faction';
import { Hero } from '../../../models/interfaces/api/hero';
import { forkJoin, Observable } from 'rxjs';
import { HeroRepository } from '../../../core/services/api/backend/hero.repository';
import { FactionRepository } from '../../../core/services/api/backend/faction.repository';

@Injectable({
  providedIn: 'root',
})
export class CreationDeckService {

  private heroRepository: HeroRepository = inject(HeroRepository);
  private factionRepository: FactionRepository = inject(FactionRepository);

  public initialiseInfos(): Observable<[heros: Array<Hero>, factions: Array<Faction>]> {
    return forkJoin([
      this.heroRepository.getAllHeroes(),
      this.factionRepository.getAllFactions()
    ]);
  }
  
}
