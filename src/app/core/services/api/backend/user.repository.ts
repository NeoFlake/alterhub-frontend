import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRequest } from '../../../../models/interfaces/users/userRequest';
import { Observable } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';
import { BACKEND_API_USERS } from '../../../../constants/backend-api-road';
import { UserAuthentification } from '../../../../models/interfaces/users/userAuthentification';
import { AuthResponse } from '../../../../models/interfaces/authentication/authResponse';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {

  private http: HttpClient = inject(HttpClient);

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${BACKEND_API_USERS.ROOT}/${id}`);
  }

  public createAccount(newUser: UserRequest): Observable<User> {
    return this.http.post<User>(BACKEND_API_USERS.REGISTER, newUser);
  }

  public login(credentials: UserAuthentification): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(BACKEND_API_USERS.LOGIN, credentials, { withCredentials: true });
  }

  public logout(): Observable<void> {
    return this.http.post<void>(BACKEND_API_USERS.LOGOUT, {}, {withCredentials: true});
  }

  public accessGranted(user: User): Observable<boolean> {
    return this.http.post<boolean>(BACKEND_API_USERS.ACCESS_GRANTED, user);
  }

  public updateUserById(user: UserRequest, id: string): Observable<User> {
    return this.http.put<User>(`${BACKEND_API_USERS.ROOT}/${id}`, user);
  }

  public deleteUserById(id: string): Observable<void> {
    return this.http.delete<void> (`${BACKEND_API_USERS.ROOT}/${id}`, {withCredentials: true});
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(BACKEND_API_USERS.REFRESH_TOKEN, null, { withCredentials: true });
  }
  
}
