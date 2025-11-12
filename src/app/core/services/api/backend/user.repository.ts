import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRequest } from '../../../../models/interfaces/users/userRequest';
import { Observable } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { BACKEND_API_USERS } from '../../../../constants/backend-api-road';
import { UserAuthentification } from '../../../../models/interfaces/users/userAuthentification';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {

  private http: HttpClient = inject(HttpClient);

  public createAccount(newUser: UserRequest): Observable<User> {
    return this.http.post<User>(`${BACKEND_API_USERS.ROOT}`, newUser);
  }

  public login(credentials: UserAuthentification): Observable<User> {
    return this.http.post<User>(`${BACKEND_API_USERS.LOGIN}`, credentials);
  }
  
}
