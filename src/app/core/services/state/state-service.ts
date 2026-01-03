import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../../../models/interfaces/users/user';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom, map, catchError, of, finalize, Observable, tap } from 'rxjs';
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
    id: '',
    lastName: '',
    firstName: '',
    playerName: '',
    email: '',
    dateOfCreation: '',
    lastModification: new Date(),
  });

  public cookieStatut: WritableSignal<string> = signal<string>('guest');

  // Méthode de mise à jour l'user
  public updateUser = (updated: User): void => this.userLogged.set(updated);

  public updateCookieStatut = (statut: string): void => this.cookieStatut.set(statut);

  public verifyExistenceOfUserStated(): boolean {
    return this.userLogged().id !== '';
  }

  public async refreshUserLogged(): Promise<void> {
    const userId: string = await this.authService.getJwtUserId();
    return new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) =>
      this.userRepository
        .getUserByIdForHydration(userId)
        .pipe(
          map((user: User) => {
            this.updateUser(user);
          }),
          catchError(() => of(null)),
          finalize(() => resolve())
        )
        .subscribe()
    );
  }

  public initializeSession(): Promise<void> {
    return new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) =>
      this.userRepository
        .getCookieStatut()
        .pipe(
          map((statut: { cookieStatut: string }) => {
            this.updateCookieStatut(statut.cookieStatut);
          }),
          catchError(() => of(null)),
          finalize(() => resolve())
        )
        .subscribe()
    );
  }
}
