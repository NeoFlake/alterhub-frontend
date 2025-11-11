import { Component, inject, OnInit } from '@angular/core';
import { TypeManager } from '../../services/type-manager';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Type } from '../../../../models/interfaces/api/type';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlteredApiRepository } from '../../services/repository/altered-api.repository';

@Component({
  selector: 'app-admin-page',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {

  private typeManager: TypeManager = inject(TypeManager);
  private alteredApiRepository: AlteredApiRepository = inject(AlteredApiRepository);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public form: FormGroup;

  public typeId: FormControl<string>;
  public name: FormControl<string>;
  public reference: FormControl<string>;

  public synchronisationMessages: Array<string> = [];
  public synchronisationActivee: boolean = false;

  constructor(){
    this.typeId = new FormControl<string>("", {nonNullable: true, validators: [Validators.required]});
    this.name = new FormControl<string>("", {nonNullable: true, validators: [Validators.required]});
    this.reference = new FormControl<string>("", {nonNullable: true, validators: [Validators.required]});

    this.form = this.formBuilder.group({
      typeId: this.typeId,
      name: this.name,
      reference: this.reference
    });
  }

  ngOnInit(): void {
      this.typeManager.fetchAllTypes()
      .pipe(
        tap((types: Array<Type>) => console.log(types))
      )
      .subscribe({
        error: (error: Error) => console.error(error)
      });

      this.typeManager.fetchTypeById("867603da-6ce0-4b28-97c8-abed197f394b")
      .pipe(
        tap((type: Type) => console.log(type))
      )
      .subscribe({
        error: (httpErrorResponse: HttpErrorResponse) => console.log(`${httpErrorResponse.error.status} : ${httpErrorResponse.error.message}`, httpErrorResponse)
      });
  }

  public handleSubmit(): void {
    const type: Type = this.form.value;
    this.typeManager.postNewType(type)
    .pipe(
      tap((type: Type) => console.log(type))
    )
    .subscribe({
      error: (httpErrorResponse: HttpErrorResponse) => console.error(`${httpErrorResponse.error.status} : ${httpErrorResponse.error.message}`, httpErrorResponse)
    });
  }

  public handleSynchronize(): void {
    this.synchronisationMessages = [];
    this.synchronisationActivee = true;
    this.alteredApiRepository.refreshCardDatabase()
    .pipe(
      tap(msg => this.synchronisationMessages.push(msg)),
      catchError((error: any) => { // Merci Angular de ce any <3
        this.synchronisationMessages.push("Erreur : " + (error instanceof Error ? error.message : 'Unknown error'));
        // Retour d’un flux vide pour finir sans bloquer
        return EMPTY;
      }),
      finalize(() => this.synchronisationMessages.push("Terminé !"))
    ).subscribe();
  }

}
