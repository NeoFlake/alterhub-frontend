import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../../core/services/api/backend/user.repository';
import { UserRequest } from '../../../models/interfaces/users/userRequest';
import { Observable } from 'rxjs';
import { User } from '../../../models/interfaces/users/user';
import { UserAuthentification } from '../../../models/interfaces/users/userAuthentification';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormManager {

  private userRepository: UserRepository = inject(UserRepository);

  public createAccount(user: Partial<{ firstName: string, lastName: string, playerName: string, email: string, password: string, confirmPassword: string }>): Observable<User> {
    
    let now: Date = new Date();

    let newUser: UserRequest = {
      firstName: user.firstName!,
      lastName: user.lastName!,
      playerName: user.playerName!,
      email: user.email!,
      password: user.password!,
      dateOfCreation: now.toISOString().slice(0, 10),
      lastModification: now,
    };

    return this.userRepository.createAccount(newUser);
  }

  public login(credentials: UserAuthentification): Observable<User> {
    return this.userRepository.login(credentials);
  }

  public accessGranted(user: User): Observable<boolean> {
    return this.userRepository.accessGranted(user);
  }

  public getFormControlErrors(form: FormGroup, controlName: string) {
    // Je récupère le champs requis par l'appel de cette méthode
    const control = form.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return [];
    }

    const errors: Array<string> = [];

    // Permet de checker l'ensemble des erreurs possible pour tous les champs existant
    if (control.errors["required"]) {
      errors.push("Ce champ est requis");
    }

    if (control.errors["minlength"]) {
      errors.push(`Un minimum de ${control.errors["minlength"].requiredLength} caractères est requis.`);
    }

    if (control.errors["maxlength"]) {
      errors.push(`Un maximum de ${control.errors["maxlength"].requiredLength} caractères est requis.`);
    }

    if (control.errors["email"]) {
      errors.push("Votre email est invalide")
    }

    if (control.errors["pattern"]) {
      errors.push("Le format ne correspond pas aux critères requis");
    }

    return errors;

  }

}
