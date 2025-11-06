import { Component, inject, OnInit } from '@angular/core';
import { TypeManager } from '../../services/type-manager';
import { tap } from 'rxjs';
import { Type } from '../../../../models/interfaces/type';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {

  private typeManager: TypeManager = inject(TypeManager);

  public form: FormGroup;

  public typeId: FormControl<string>;
  public name: FormControl<string>;
  public reference: FormControl<string>;

  constructor(private formBuilder: FormBuilder){

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

}
