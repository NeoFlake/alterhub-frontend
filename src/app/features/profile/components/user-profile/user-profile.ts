import { Component, inject } from '@angular/core';
import { UserProfileFacade } from '../../services/user-profile-facade';
import { User } from '../../../../models/interfaces/users/user';
import { Subject, takeUntil, tap } from 'rxjs';
import { StateService } from '../../../../core/services/state/state-service';
import { ReadableDatePipe } from "../../../../shared/pipe/readable-date-pipe";

@Component({
  selector: 'user-profile',
  imports: [ReadableDatePipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  public userProfileFacade: UserProfileFacade = inject(UserProfileFacade);
  public stateService: StateService = inject(StateService);

  public userData: User = this.stateService.userLogged();

}
