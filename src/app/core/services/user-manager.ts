import { inject, Injectable } from '@angular/core';
import { UserRepository } from './api/backend/user.repository';
import { User } from '../../models/interfaces/users/user';
import { catchError, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserRequest } from '../../models/interfaces/users/userRequest';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AUTHENTIFICATION_ROAD, HOMEPAGE_ROAD } from '../../constants/routes';
import { StateService } from './state/state-service';

@Injectable({
  providedIn: 'root',
})
export class UserManager {
  private userRepository: UserRepository = inject(UserRepository);
  private stateService: StateService = inject(StateService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private userLoggedRefreshed: User = {
    id: '',
    lastName: '',
    firstName: '',
    playerName: '',
    email: '',
    dateOfCreation: '',
    lastModification: new Date(),
  };

  public updateUserById(
    updatingFormData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      newPassword: string | null;
    }>,
    userLogged: User
  ): Observable<User> {
    let now: Date = new Date();

    let newUser: UserRequest = {
      id: userLogged.id,
      firstName: updatingFormData.firstName!,
      lastName: updatingFormData.lastName!,
      playerName: userLogged.playerName!,
      email: updatingFormData.email!,
      password: updatingFormData.password!,
      newPassword: updatingFormData.newPassword != '' ? updatingFormData.newPassword : null,
      dateOfCreation: userLogged.dateOfCreation,
      lastModification: now,
    };

    return this.userRepository.updateUserById(newUser, userLogged.id);
  }

  public deleteUserById(id: string): void {
    this.userRepository
      .deleteUserById(id)
      .pipe(
        switchMap(() => this.stateService.refreshCookieStatut()),
        tap(() => {
          this.authService.logout();
          this.stateService.updateUser(this.userLoggedRefreshed);
          this.router.navigate([`/${HOMEPAGE_ROAD}`]);
        })
      )
      .subscribe();
  }

  public logout(): void {
    this.userRepository
      .logout()
      .pipe(
        switchMap(() => this.stateService.refreshCookieStatut()),
        tap(() => {
          this.authService.logout();
          this.stateService.updateUser(this.userLoggedRefreshed);
        }),
        catchError(() => {
          return of(null);
        }),
        finalize(() => this.router.navigate([`/${HOMEPAGE_ROAD}`]))
      )
      .subscribe();
  }
}
