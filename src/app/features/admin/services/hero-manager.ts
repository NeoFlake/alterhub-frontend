import { inject, Injectable } from '@angular/core';
import { HeroRepository } from '../../../core/services/api/backend/hero.repository';
import { FactionRepository } from '../../../core/services/api/backend/faction.repository';
import { SetRepository } from '../../../core/services/api/backend/set.repository';
import { map, Observable, of, tap } from 'rxjs';
import { Faction } from '../../../models/interfaces/api/faction';
import { Set } from '../../../models/interfaces/api/set';
import { Hero } from '../../../models/interfaces/api/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroManager {
  private heroRepository: HeroRepository = inject(HeroRepository);
  private factionRepository: FactionRepository = inject(FactionRepository);
  private setRepository: SetRepository = inject(SetRepository);

  private factions: Array<Faction> = [];
  private sets: Array<Set> = [];

  public getAllFactions(): Observable<Array<Faction>> {
    return this.factionRepository.getAllFactions()
    .pipe(
      tap((factions: Array<Faction>) =>{ 
        this.factions = factions;
        return factions;
      })
    );
  }

  public getAllSets(): Observable<Array<Set>> {
    return this.setRepository.getAllSets()
    .pipe(
      tap((sets: Array<Set>) =>{ 
        this.sets = sets;
        return sets;
      })
    );
  }

  public createHero(
    formValues: Partial<{
      name: string;
      faction: string;
      sets: Array<string>;
      reserveSlot: number;
      landmarkSlot: number;
      effect: string;
      image: string;
    }>
  ): Observable<Hero> {
    
    let newHero: Hero = {
      name: formValues.name ?? "Héro Fantome",
      faction: this.factions.find((faction: Faction) => (faction.factionId === formValues.faction!))!,
      sets: this.sets.filter((set: Set) => formValues.sets?.includes(set.setId)) ?? [
        '01HKAFJN3HG3TWKYV0E014K01G',
      ],
      reserveSlot: formValues.reserveSlot!,
      landmarkSlot: formValues.landmarkSlot!,
      effect: formValues.effect ?? '',
      image: formValues.image ?? '',
    };

    return this.heroRepository.createHero(newHero);
  }

  public getAllHeroes(): Observable<Array<Hero>> {
    return this.heroRepository.getAllHeroes();
  }

  public updateHeroById(
    id: string,
    formValues: Partial<{
      name: string;
      faction: string;
      sets: Array<string>;
      reserveSlot: number;
      landmarkSlot: number;
      effect: string;
      image: string;
    }>
  ): Observable<Hero> {
    let updatedHero: Hero = {
      id: id,
      name: formValues.name ?? "Héro Fantome",
      faction: this.factions.find((faction: Faction) => (faction.factionId === formValues.faction!))!,
      sets: this.sets.filter((set: Set) => formValues.sets?.includes(set.setId)) ?? [
        '01HKAFJN3HG3TWKYV0E014K01G',
      ],
      reserveSlot: formValues.reserveSlot!,
      landmarkSlot: formValues.landmarkSlot!,
      effect: formValues.effect ?? '',
      image: formValues.image ?? '',
    };

    return this.heroRepository.updateHeroById(id, updatedHero);
  }

  public deleteHeroById(id: string): Observable<void> {
    return this.heroRepository.deleteHeroById(id);
  }
}
