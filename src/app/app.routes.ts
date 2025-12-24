import { Routes } from '@angular/router';
import { AdminPage } from './features/admin/pages/admin-page/admin-page';
import {
  ADMINPAGE_ROAD,
  AUTHENTIFICATION_ROAD,
  DECK_ROAD,
  HOMEPAGE_ROAD,
  STAR_TOKEN,
  USER_ROAD,
} from './constants/routes';
import { AuthentificationPage } from './features/authentification/pages/authentification-page/authentification-page';
import { HomePage } from './features/homepage/pages/home-page/home-page';
import { UserPage } from './features/profile/pages/user-page/user-page';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { CreationDeck } from './features/creation-deck/pages/creation-deck/creation-deck';
import { DeckList } from './features/deck-list/pages/deck-list/deck-list';
import { DeckDetail } from './features/deck-detail/pages/deck-detail/deck-detail';

export const routes: Routes = [
  // Route lié à la vue administration
  { path: ADMINPAGE_ROAD, component: AdminPage, canActivate: [authGuard, roleGuard] },
  // Routes liés à la vue d'authentification
  // Redirection vers la page de connexion si l'on entre uniquement la racine de la route
  {
    path: AUTHENTIFICATION_ROAD.ROOT,
    redirectTo: `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`,
    pathMatch: 'full',
  },
  {
    path: AUTHENTIFICATION_ROAD.ROOT,
    children: [
      { path: AUTHENTIFICATION_ROAD.LOGIN, component: AuthentificationPage }, // Page de connexion
      { path: AUTHENTIFICATION_ROAD.CREATE_ACCOUNT, component: AuthentificationPage }, // Page de création de compte
      {
        path: `:anything`,
        redirectTo: `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`,
      },
    ],
  },
  // Routes liés à la gestion des decks (création/consultation/modification)
  {
    path: DECK_ROAD.ROOT,
    children: [
      { path: DECK_ROAD.ALL, component: DeckList },
      {
        path: DECK_ROAD.MINE,
        component: DeckList,
        canActivate: [authGuard]
      },
      {
        path: DECK_ROAD.CREATE,
        component: CreationDeck,
        canActivate: [authGuard],
      },
      {
        path: `:id`,
        component: DeckDetail,
      },
    ],
  },
  // Route lié à la page d'accueil
  { path: HOMEPAGE_ROAD, component: HomePage },
  // Route lié à la page personnelle de l'utilisateur
  { path: USER_ROAD, component: UserPage, canActivate: [authGuard] },
  // La racine redirige automatiquement vers la page d'accueil (homepage)
  {
    path: '',
    redirectTo: `${HOMEPAGE_ROAD}`,
    pathMatch: 'full',
  },
  // Toute route invalide redirige automatiquement vers la page d'accueil (homepage)
  {
    path: `${STAR_TOKEN}`,
    redirectTo: `${HOMEPAGE_ROAD}`,
  },
];
