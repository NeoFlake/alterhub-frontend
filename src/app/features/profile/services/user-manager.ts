import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../../../core/services/api/backend/user.repository';
import { User } from '../../../models/interfaces/users/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManager {

  private userRepository: UserRepository = inject(UserRepository);

  public getUserById(id: string): Observable<User> {
    return this.userRepository.getUserById(id);
  }
  
}
