import { Component, input, InputSignal } from '@angular/core';
import { ReadableDatePipe } from '../../../../shared/pipe/readable-date-pipe';

@Component({
  selector: 'user-profile-card',
  imports: [ReadableDatePipe],
  templateUrl: './user-profile-card.html',
  styleUrl: './user-profile-card.css',
})
export class UserProfileCard {
  public cardData: InputSignal<{
    cardTitle: string;
    iconClass: string;
    cardBody: string|Date;
    isDate: boolean;
  }> = input.required<{
    cardTitle: string;
    iconClass: string;
    cardBody: string|Date;
    isDate: boolean;
  }>();

}
