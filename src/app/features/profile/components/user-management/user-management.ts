import { Component, inject } from '@angular/core';
import { UserManager } from '../../services/user-manager';
import { Subject, takeUntil, tap } from 'rxjs';
import { User } from '../../../../models/interfaces/users/user';

@Component({
  selector: 'user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  public userManager: UserManager = inject(UserManager);

  public userLogged: User;

  private unsubscriber$ = new Subject<void>();

  constructor() {
    this.userLogged = JSON.parse(localStorage.getItem('loggedInfo')!);
    this.userManager.getUserById(this.userLogged.id).pipe(
      tap((user: User) => console.log(user)),
      takeUntil(this.unsubscriber$)
    )
    .subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
