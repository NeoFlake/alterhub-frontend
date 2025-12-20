import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, tap, catchError, takeUntil, of, forkJoin } from 'rxjs';
import { HeroManager } from '../../services/hero-manager';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Set } from '../../../../models/interfaces/api/set';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HERO_FORM_LIBELLE } from '../../../../constants/administration.constantes';
import { CombinedRecursiveAstVisitor } from '@angular/compiler';

@Component({
  selector: 'hero-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css',
})
export class HeroForm {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private heroManager: HeroManager = inject(HeroManager);

  public heroForm: FormGroup;

  public name: FormControl<string>;
  public faction: FormControl<string>;
  public sets: FormControl<Array<string>>;
  public reserveSlot: FormControl<number>;
  public landmarkSlot: FormControl<number>;
  public effect: FormControl<string>;
  public image: FormControl<string>;

  public factions: WritableSignal<Array<Faction>> = signal<Array<Faction>>([]);
  public set: WritableSignal<Array<Set>> = signal<Array<Set>>([]);

  public heroes: InputSignal<WritableSignal<Hero[]>> =
    input.required<WritableSignal<Array<Hero>>>();

  public updateHeroId: InputSignal<WritableSignal<string>> =
    input.required<WritableSignal<string>>();

  public updateDone: OutputEmitterRef<void> = output<void>();

  public reserveSlotChoice: Array<number> = [0, 1, 2, 3, 4, 5];
  public landmarkSlotChoice: Array<number> = [0, 1, 2, 3, 4, 5];

  public heroFormMode: 'add' | 'update' = 'add';

  public heroFormLibelle: typeof HERO_FORM_LIBELLE = HERO_FORM_LIBELLE;

  private unsubscriber$ = new Subject<void>();

  constructor() {
    this.name = this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    });

    // Obligatoirement 36 caractères car cela correspond à l'UUID de la Faction
    this.faction = this.formBuilder.control<string>('01GE7AC9XBG707G19F03A95TH1', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(36), Validators.maxLength(36)],
    });

    this.sets = this.formBuilder.control<Array<string>>(['01HKAFJN3HG3TWKYV0E014K01G'], {
      nonNullable: true,
      validators: [Validators.required],
    });

    this.reserveSlot = this.formBuilder.control<number>(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(9)],
    });

    this.landmarkSlot = this.formBuilder.control<number>(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(9)],
    });

    this.effect = this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1024)],
    });

    this.image = this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(26), Validators.maxLength(26)],
    });

    this.heroForm = this.formBuilder.group({
      name: this.name,
      faction: this.faction,
      sets: this.sets,
      reserveSlot: this.reserveSlot,
      landmarkSlot: this.landmarkSlot,
      effect: this.effect,
      image: this.image,
    });

    effect(() => {
      const heroIdToUpdate: string = this.updateHeroId()();

      if (heroIdToUpdate !== '') {
        // Le héro qui a été cliqué depuis la liste des héros existe forcément dans la liste des héros
        // D'où le point d'exclamation pour rassurer Angular sur son existance
        const heroToUpdate: Hero = this.heroes()().find(
          (hero: Hero) => hero.id! === heroIdToUpdate
        )!;

        this.heroFormMode = 'update';

        this.name.setValue(heroToUpdate.name);
        this.faction.setValue(heroToUpdate.faction.factionId);
        this.sets.setValue(heroToUpdate.sets.map((set: Set) => set.setId));
        this.reserveSlot.setValue(heroToUpdate.reserveSlot);
        this.landmarkSlot.setValue(heroToUpdate.landmarkSlot);
        this.effect.setValue(heroToUpdate.effect);
        this.image.setValue(heroToUpdate.image);
      }
    });
  }

  ngOnInit(): void {
    forkJoin([this.heroManager.getAllFactions(), this.heroManager.getAllSets()])
      .pipe(
        tap(([factions, sets]) => {
          this.factions.set(factions.sort((a: Faction, b: Faction) => (a.name > b.name ? 1 : -1)));
          this.set.set(sets);
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public createNewHero(): void {
    const formValues: Partial<{
      name: string;
      faction: string;
      sets: Array<string>;
      reserveSlot: number;
      landmarkSlot: number;
      effect: string;
      image: string;
    }> = this.heroForm.value;

    this.heroManager
      .createHero(formValues)
      .pipe(
        tap((hero: Hero) => {
          this.heroes().update((heroes: Array<Hero>) => [...heroes, hero]);
          this.resetFormValues();
        }),
        catchError((error: HttpErrorResponse) => {
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  public updateHero(): void {
    const formValues: Partial<{
      name: string;
      faction: string;
      sets: Array<string>;
      reserveSlot: number;
      landmarkSlot: number;
      effect: string;
      image: string;
    }> = this.heroForm.value;

    this.heroManager
      .updateHeroById(this.updateHeroId()(), formValues)
      .pipe(
        tap((hero: Hero) => {
          this.heroes().update((heroes: Array<Hero>) =>
            heroes.map((dataHero: Hero) => (dataHero.id === hero.id ? hero : dataHero))
          );
          this.backToAddForm();
        }),
        catchError((error: HttpErrorResponse) => {
          return of(null);
        }),
        takeUntil(this.unsubscriber$)
      )
      .subscribe();
  }

  public resetFormValues(): void {
    this.name.setValue('');
    this.faction.setValue('01GE7AC9XBG707G19F03A95TH1');
    this.sets.setValue(['01HKAFJN3HG3TWKYV0E014K01G']);
    this.reserveSlot.setValue(2);
    this.landmarkSlot.setValue(2);
    this.effect.setValue('');
    this.image.setValue('');
  }

  public backToAddForm(): void {
    this.updateHeroId().set('');
    this.heroFormMode = 'add';
    this.resetFormValues();
    this.updateDone.emit();
  }
}
