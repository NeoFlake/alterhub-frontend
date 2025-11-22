import { Component, inject, OnInit } from '@angular/core';
import { UserProfileFacade } from '../../services/user-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  public userProfileFacade: UserProfileFacade = inject(UserProfileFacade);

  public userLogged: User;

  private unsubscriber$ = new Subject<void>();

  constructor(){
    this.userLogged = JSON.parse(localStorage.getItem("loggedInfo")!);
    this.userProfileFacade.getUserById(this.userLogged.id)
    .pipe(
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
