import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../../../models/interfaces/users/user';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom, map, catchError, of, finalize } from 'rxjs';
import { UserRepository } from '../api/backend/user.repository';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  private authService: AuthService = inject(AuthService);
  private userRepository: UserRepository = inject(UserRepository);

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

  constructor() {

  }

  // Méthode de mise à jour l'user
  public updateUser = (updated: User): void => this.userLogged.set(updated);

  public verifyExistenceOfUserStated(): boolean {
    return this.userLogged().id !== "";
  }

  public async refreshUserLogged(): Promise<void> {
    const userId: string = await this.authService.getJwtUserId();
      return new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) => this.userRepository.getUserById(userId)
      .pipe(
        map((user: User) => {
        this.updateUser(user);
      }),
      catchError(() => of(null)),
        finalize(() => resolve())
      ).subscribe()); 
  }

}
