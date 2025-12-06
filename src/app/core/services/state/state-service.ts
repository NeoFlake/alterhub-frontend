import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../../../models/interfaces/users/user';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  // User utilisé dans l'application centralisé ici-même
  // Initialisé avec des paramètres vides pour éviter de se trimbaler
  // un type null dans toute l'application. On vérifiera juste
  // que le user.id est bien hydraté
  public userLogged: WritableSignal<User> = signal<User>({
    id: "",
    lastName: "",
    firstName: "",
    playerName: "",
    email: "",
    dateOfCreation: "",
    lastModification: new Date()
  });

  // Méthode pour mettre à jour l'user
  public updateUser = (updated: User): void => this.userLogged.set(updated);

  public verifyExistenceOfUserStated(): boolean {
    return this.userLogged().id !== "";
  }

}
