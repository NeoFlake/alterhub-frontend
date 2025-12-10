import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InvalidFeedbackManager {

  public getFormControlErrors(form: FormGroup, controlName: string) {
    // Je récupère le champs requis par l'appel de cette méthode
    const control = form.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return [];
    }

    const errors: Array<string> = [];

    // Permet de checker l'ensemble des erreurs possible pour tous les champs existant
    if (control.errors['required']) {
      errors.push('Ce champ est requis');
    }

    if (control.errors['minlength']) {
      errors.push(
        `Un minimum de ${control.errors['minlength'].requiredLength} caractères est requis.`
      );
    }

    if (control.errors['maxlength']) {
      errors.push(
        `Un maximum de ${control.errors['maxlength'].requiredLength} caractères est requis.`
      );
    }

    if (control.errors['email']) {
      errors.push('Votre email est invalide');
    }

    if (control.errors['pattern']) {
      errors.push('Le format ne correspond pas aux critères requis');
    }

    return errors;
  }
}
