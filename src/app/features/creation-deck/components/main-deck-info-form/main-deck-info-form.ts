import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Hero } from '../../../../models/interfaces/api/hero';
import { Faction } from '../../../../models/interfaces/api/faction';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvalidFeedback } from '../../../../shared/components/invalid-feedback/invalid-feedback';
import { DECK_LIBELLES } from '../../../../constants/decks-page.constantes';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';

@Component({
  selector: 'main-deck-info-form',
  imports: [ReactiveFormsModule, InvalidFeedback],
  templateUrl: './main-deck-info-form.html',
  styleUrl: './main-deck-info-form.css',
})
export class MainDeckInfoForm {
  public formBuilder: FormBuilder = inject(FormBuilder);

  public heroes: InputSignal<Array<Hero>> = input.required<Array<Hero>>();
  public factions: InputSignal<Array<Faction>> = input.required<Array<Faction>>();

  public activateSecondStep: OutputEmitterRef<
    Partial<{
      name: string;
      faction: Faction;
      hero: Hero;
    }>
  > = output<Partial<{ name: string; faction: Faction; hero: Hero }>>();

  public selectedFactionId: WritableSignal<string | null> = signal<string | null>(null);

  public name: FormControl<string>;
  public faction: FormControl<string>;
  public hero: FormControl<string>;

  public mainDeckInfosForm: FormGroup;

  public mainDeckInfosLibelle: typeof DECK_LIBELLES.MAIN_DECK_INFO_FORM =
    DECK_LIBELLES.MAIN_DECK_INFO_FORM;
  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;

  // S'active à chaque modification du signal selectedFactionId
  public availableHeroes: Signal<Array<Hero>> = computed(() => {
    const selectedFactionId: string | null = this.selectedFactionId();
    if (!selectedFactionId) {
      return [];
    }
    return this.heroes().filter((hero: Hero) => hero.faction.id === selectedFactionId);
  });

  // S'active à chaque modification du signal selectedFactionId
  public giveFactionColor: Signal<string> = computed(() => {
    const selectedFactionId: string | null = this.selectedFactionId();
    if (selectedFactionId) {
      const faction: Faction | undefined = this.factions().find(
        (faction: Faction) => faction.id === selectedFactionId
      );
      if (faction) {
        return faction.color;
      }
    }
    return '#ffffff';
  });

  // S'active à chaque modification du signal selectedFactionId
  public giveFactionColorToGlow: Signal<string> = computed(() => {
    const selectedFactionId: string | null = this.selectedFactionId();
    if (selectedFactionId) {
      const faction: Faction | undefined = this.factions().find(
        (faction: Faction) => faction.id === selectedFactionId
      );
      if (faction) {
        return this.fromHexaToRGBA(faction.color);
      }
    }
    return '#ffffff';
  });

  constructor() {
    this.name = this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });

    this.faction = this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(36), Validators.maxLength(36)],
    });

    this.hero = this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(36), Validators.maxLength(36)],
    });

    this.mainDeckInfosForm = this.formBuilder.group({
      name: this.name,
      faction: this.faction,
      hero: this.hero,
    });
  }

  public onSelectFaction(factionId: string): void {
    this.selectedFactionId.set(factionId);
    this.hero.setValue('');
  }

  /**
   * On récupère les informations récoltées lors de la première phase de création du deck
   * pour les transfèrer au parent qui va les garder bien précieusement 
   * et déclencher la phase 2 du processus de création
   */
  public validateMainDeckInfos(): void {
    const mainDeckInfo: Partial<{ name: string; faction: Faction; hero: Hero }> = {
      name: this.mainDeckInfosForm.get("name")!.value,
      faction: this.factions().find((faction: Faction) => faction.id === this.mainDeckInfosForm.get("faction")!.value),
      hero: this.heroes().find((hero: Hero) => hero.id === this.mainDeckInfosForm.get("hero")!.value),
    };
    this.activateSecondStep.emit(mainDeckInfo);
  }

  public fromHexaToRGBA(hex: string): string {
    // On transforme notre valeur hexadécimale reçue du back en RGBA pour pouvoir l'utiliser comme effet de lumière
    const hexWithoutSharp = hex.replace('#', '');
    const red = parseInt(hexWithoutSharp.substring(0, 2), 16);
    const green = parseInt(hexWithoutSharp.substring(2, 4), 16);
    const blue = parseInt(hexWithoutSharp.substring(4, 6), 16);
    // Si la couleur reçue n'est pas transformable de hexa à rgb on la transforme en blanc
    if (isNaN(red) || isNaN(red) || isNaN(red)) {
      return `rgb(255, 255, 255)`;
    }
    return `rgb(${red}, ${green}, ${blue}, 0.3)`;
  }

  public fixFactionIcon(nameFaction: string): string {
    return `images/icones faction/${nameFaction}.png`;
  }
}
