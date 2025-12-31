import { Component, inject, WritableSignal } from '@angular/core';
import { User } from '../../../../models/interfaces/users/user';
import { StateService } from '../../../../core/services/state/state-service';
import { ReadableDatePipe } from '../../../../shared/pipe/readable-date-pipe';
import { UserProfileCard } from '../user-profile-card/user-profile-card';
import { PROFILE_LIBELLE } from '../../../../constants/profile-page.constantes';

@Component({
  selector: 'user-profile',
  imports: [UserProfileCard],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  public stateService: StateService = inject(StateService);

  public userData: WritableSignal<User> = this.stateService.userLogged;

  public userProfileLibelle: typeof PROFILE_LIBELLE.USER_PROFILE = PROFILE_LIBELLE.USER_PROFILE;

  public cardsData: Array<{
    cardTitle: string;
    iconClass: string;
    cardBody: string|Date;
    isDate: boolean;
  }> = [
    {
      cardTitle: this.userProfileLibelle.CARD_TITLE.FIRSTNAME,
      iconClass: this.userProfileLibelle.ICONE_CLASS.PERSON,
      cardBody: this.userData().firstName,
      isDate: false,
    },
    {
      cardTitle: this.userProfileLibelle.CARD_TITLE.LASTNAME,
      iconClass: this.userProfileLibelle.ICONE_CLASS.PERSON,
      cardBody: this.userData().lastName,
      isDate: false,
    },
    {
      cardTitle: this.userProfileLibelle.CARD_TITLE.DATE_OF_CREATION,
      iconClass: this.userProfileLibelle.ICONE_CLASS.CALENDAR,
      cardBody: this.userData().dateOfCreation,
      isDate: true,
    },
    {
      cardTitle: this.userProfileLibelle.CARD_TITLE.LASTNAME,
      iconClass: this.userProfileLibelle.ICONE_CLASS.CLOCK_HISTORY,
      cardBody: this.userData().lastModification,
      isDate: true,
    },
  ];
}
