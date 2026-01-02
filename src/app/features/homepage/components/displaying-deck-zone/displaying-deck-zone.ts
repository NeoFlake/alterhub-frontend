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
import { HOMEPAGE_LIBELLE } from '../../../../constants/homepage.constantes';
import { Faction } from '../../../../models/interfaces/api/faction';
import { ReadableDatePipe } from '../../../../shared/pipe/readable-date-pipe';
import { Router } from '@angular/router';
import { DECK_ROAD } from '../../../../constants/routes';
import { Deck } from '../../../../models/interfaces/api/deck';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';

@Component({
  selector: 'displaying-deck-zone',
  imports: [ReadableDatePipe],
  templateUrl: './displaying-deck-zone.html',
  styleUrl: './displaying-deck-zone.css',
})
export class DisplayingDeckZone {
  private router: Router = inject(Router);

  public decks: InputSignal<Array<Deck>> = input.required<Array<Deck>>();

  public factions: InputSignal<Array<Faction>> = input.required<Array<Faction>>();

  public displayingType: InputSignal<'CREATED' | 'MODIFIED'> = input.required<
    'CREATED' | 'MODIFIED'
  >();

  public selectChange: OutputEmitterRef<{
    factionId: string;
    displayingType: 'CREATED' | 'MODIFIED';
  }> = output<{ factionId: string; displayingType: 'CREATED' | 'MODIFIED' }>();

  public factionChoosen: WritableSignal<Faction | null> = signal<Faction | null>(null);

  public displayingDeckZoneLibelle: typeof HOMEPAGE_LIBELLE.DISPLAYING_DECK_ZONE =
    HOMEPAGE_LIBELLE.DISPLAYING_DECK_ZONE;

  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  public getDeckZoneTitle(): string {
    return this.displayingType() === "CREATED" ? `${this.displayingDeckZoneLibelle.FIRST_PART_TITLE}${
      this.factionChoosen() ? this.factionChoosen()!.name : ''
    } ${this.displayingDeckZoneLibelle.LAST_PART_TITLE}` : `${this.displayingDeckZoneLibelle.MODIFIED_FIRST_PART_TITLE}${
      this.factionChoosen() ? this.factionChoosen()!.name : ''
    } ${this.displayingDeckZoneLibelle.LAST_PART_TITLE}`;
  }

  public getFactionColorRowStyle(color: string): {
    background: string;
    'border-left': string;
  } {
    const startColor = color + '80';
    const endColor = color + '50';
    const borderColor = color + '20';

    return {
      background: `linear-gradient(90deg, ${startColor} 30%, ${endColor} 85%)`,
      'border-left': `4px solid ${borderColor}`,
    };
  }

  public onSelectChange(factionId: string): void {
    this.factionChoosen.set(this.factions().find((faction: Faction) => faction.id === factionId)!);
    this.selectChange.emit({ factionId: factionId, displayingType: this.displayingType() });
  }

  public onClickSeeAllDecks(): void {
    this.router.navigate([DECK_ROAD.ROOT, DECK_ROAD.ALL]);
  }

  public onClickDetailDeck(deckId: string): void {
    this.router.navigate([DECK_ROAD.ROOT, deckId]);
  }
}
