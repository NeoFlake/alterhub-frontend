import { Component, inject, WritableSignal } from '@angular/core';
import { User } from '../../../../models/interfaces/users/user';
import { StateService } from '../../../../core/services/state/state-service';
import { ReadableDatePipe } from "../../../../shared/pipe/readable-date-pipe";

@Component({
  selector: 'user-profile',
  imports: [ReadableDatePipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  public stateService: StateService = inject(StateService);

  public userData: WritableSignal<User> = this.stateService.userLogged;

}
