import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROAD } from '../../../../constants/routes';
import { UserManager } from '../../../../core/services/user-manager';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  public router: Router = inject(Router);
  public userManager: UserManager = inject(UserManager);

  public goToProfile(): void {
    this.router.navigate([USER_ROAD]);
  }

  public logout(): void {
    this.userManager.logout();
  }

}
