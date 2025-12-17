import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, tap, catchError, takeUntil, switchMap, of, forkJoin } from 'rxjs';
import { HeroFormManager } from '../../services/hero-form-manager';
import { Faction } from '../../../../models/interfaces/api/faction';
import { Set } from '../../../../models/interfaces/api/set';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HERO_FORM_LIBELLE } from '../../../../constants/administration.constantes';

@Component({
  selector: 'hero-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css',
})
export class HeroForm {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private heroFormManager: HeroFormManager = inject(HeroFormManager);

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
  public heroes: WritableSignal<Array<Hero>> = signal<Array<Hero>>([]);

  public reserveSlotChoice: Array<number> = [0, 1, 2, 3, 4, 5];
  public landmarkSlotChoice: Array<number> = [0, 1, 2, 3, 4, 5];

  public heroFormMode: 'add' | 'update' = 'add';

  public heroFormLibelle: typeof HERO_FORM_LIBELLE = HERO_FORM_LIBELLE;

  private unsubscriber$ = new Subject<void>();

  constructor() {
    this.name = this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(128)]
    });

    // Obligatoirement 36 caractères car cela correspond à l'UUID de la Faction
    this.faction = this.formBuilder.control<string>('01GE7AC9XBG707G19F03A95TH1', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(36), Validators.maxLength(36)]
    });

    this.sets = this.formBuilder.control<Array<string>>(["01HKAFJN3HG3TWKYV0E014K01G"], {
      nonNullable: true,
      validators: [Validators.required]
    });

    this.reserveSlot = this.formBuilder.control<number>(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(9)]
    });

    this.landmarkSlot = this.formBuilder.control<number>(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(9)]
    });

    this.effect = this.formBuilder.control<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]
    });

    this.image = this.formBuilder.control<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(26), Validators.maxLength(26)]
    })

    this.heroForm = this.formBuilder.group({
      name: this.name,
      faction: this.faction,
      sets: this.sets,
      reserveSlot: this.reserveSlot,
      landmarkSlot: this.landmarkSlot,
      effect: this.effect,
      image: this.image
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.heroFormManager.getAllFactions(),
      this.heroFormManager.getAllSets(),
      this.heroFormManager.getAllHeroes()
    ])
    .pipe(
      tap(([factions, sets, heroes]) => {
        this.factions.set(factions.sort((a: Faction, b: Faction) => a.name > b.name ? 1 : -1));
        this.set.set(sets);
        this.heroes.set(heroes);
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
      name: string,
      faction: string,
      sets: Array<string>,
      reserveSlot: number,
      landmarkSlot: number,
      effect: string,
      image: string
    }> = this.heroForm.value;

    this.heroFormManager.createHero(formValues, this.factions(), this.set())
    .pipe()
    .subscribe();

  } 

  public updateHero(): void {
    
  }

}
