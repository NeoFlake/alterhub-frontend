import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../../../models/interfaces/api/hero';
import { BACKEND_API_HEROES } from '../../../../constants/backend-api-road';

@Injectable({
  providedIn: 'root',
})
export class HeroRepository {

  private http: HttpClient = inject(HttpClient);

  public getAllHeroes(): Observable<Array<Hero>> {
    return this.http.get<Array<Hero>>(`${BACKEND_API_HEROES.ROOT}`);
  }

  public getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${BACKEND_API_HEROES.ROOT}/${id}`);
  }

  public getHeroByName(name: string): Observable<Hero> {
    return this.http.get<Hero>(`${BACKEND_API_HEROES.BY_NAME}/${name}`);
  }

  public getHeroByFactionId(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${BACKEND_API_HEROES.BY_FACTION}/${id}`);
  }

  public createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${BACKEND_API_HEROES.ROOT}`, hero);
  }

  public updateHeroById(id: string, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${BACKEND_API_HEROES.ROOT}/${id}`, hero);
  }

  public deleteHeroById(id: string): Observable<void> {
    return this.http.delete<void>(`${BACKEND_API_HEROES.ROOT}/${id}`);
  }
  
}
