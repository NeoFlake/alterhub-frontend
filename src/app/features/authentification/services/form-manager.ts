import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../../core/services/api/backend/user.repository';
import { UserRequest } from '../../../models/interfaces/users/userRequest';
import { Observable } from 'rxjs';
import { User } from '../../../models/interfaces/users/user';
import { UserAuthentification } from '../../../models/interfaces/users/userAuthentification';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../../models/interfaces/authentication/authResponse';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FormManager {

  private userRepository: UserRepository = inject(UserRepository);

  public createAccount(user: Partial<{ firstName: string, lastName: string, playerName: string, email: string, password: string }>): Observable<User> {
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

  public login(credentials: UserAuthentification): Observable<AuthResponse> {
    return this.userRepository.login(credentials);
  }

  public accessGranted(user: User): Observable<boolean> {
    return this.userRepository.accessGranted(user);
  }

}
