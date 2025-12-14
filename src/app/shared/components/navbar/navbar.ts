import { Component, inject } from '@angular/core';
import { StateService } from '../../../core/services/state/state-service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { ADMINPAGE_ROAD, AUTHENTIFICATION_ROAD, HOMEPAGE_ROAD, USER_ROAD } from '../../../constants/routes';
import { PAGE_LIBELLE } from '../../../constants/navbar.constantes';
import { filter } from 'rxjs';
import { UserManager } from '../../../core/services/user-manager';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public stateService: StateService = inject(StateService);
  public authService: AuthService = inject(AuthService);
  private userManager: UserManager = inject(UserManager);
  public router: Router = inject(Router);

  public libelles = PAGE_LIBELLE;

  public pageTitle = 'AlterHub';

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log();
        switch (event.url) {
          case `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`:
            this.pageTitle = this.libelles.AUTHENTICATION.LOGIN;
            break;
          case `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`:
            this.pageTitle = this.libelles.AUTHENTICATION.CREATE_ACCOUNT;
            break;
          case `/${USER_ROAD}`:
            this.pageTitle = this.libelles.USER;
            break;
          case `/${ADMINPAGE_ROAD}`:
            this.pageTitle = this.libelles.ADMINPAGE;
            break;
          case `/${HOMEPAGE_ROAD}`:
          default:
            break;
        }
      });
  }

  public goToLogin(): void {
    this.router.navigate([AUTHENTIFICATION_ROAD.ROOT, AUTHENTIFICATION_ROAD.LOGIN]);
  }

  public logout(): void {
    this.userManager.logout();
  }

}
