import { Component, inject } from '@angular/core';
import { StateService } from '../../../core/services/state/state-service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  ADMINPAGE_ROAD,
  AUTHENTIFICATION_ROAD,
  DECK_ROAD,
  HOMEPAGE_ROAD,
  USER_ROAD,
} from '../../../constants/routes';
import { PAGE_LIBELLE } from '../../../constants/navbar.constantes';
import { filter } from 'rxjs';
import { UserManager } from '../../../core/services/user-manager';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
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
        // if (
        //   event.url.match(
        //     `^/${DECK_ROAD.ROOT}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`
        //   )
        // ) {
        //   this.pageTitle = 'Détail du Deck';
        // }
        switch (event.url) {
          case `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`:
            this.pageTitle = this.libelles.AUTHENTICATION.LOGIN;
            break;
          case `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`:
            this.pageTitle = this.libelles.AUTHENTICATION.CREATE_ACCOUNT;
            break;
          case `/${DECK_ROAD.ROOT}/${DECK_ROAD.ALL}`:
            this.pageTitle = this.libelles.DECK.READ_ALL_DECK_TITLE;
            break;
          case `/${DECK_ROAD.ROOT}/${DECK_ROAD.MINE}`:
            this.pageTitle = this.libelles.DECK.READ_ALL_MY_DECKS;
            break;
          case `/${DECK_ROAD.ROOT}/${DECK_ROAD.CREATE}`:
            this.pageTitle = this.libelles.DECK.CREATE_DECK;
            break;
          case `/${DECK_ROAD.ROOT}/`:
            this.pageTitle = this.libelles.DECK.READ_ALL_DECK_TITLE;
            break;
          case `/${USER_ROAD}`:
            this.pageTitle = this.libelles.USER;
            break;
          case `/${ADMINPAGE_ROAD}`:
            this.pageTitle = this.libelles.ADMINPAGE;
            break;
          case `/${HOMEPAGE_ROAD}`:
            this.pageTitle = 'AlterHub';
            break;
          default:
            this.pageTitle = 'Détail du Deck';
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
