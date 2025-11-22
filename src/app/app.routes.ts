import { Routes } from '@angular/router';
import { AdminPage } from './features/admin/pages/admin-page/admin-page';
import { ADMINPAGE_ROAD, AUTHENTIFICATION_ROAD, HOMEPAGE_ROAD, STAR_TOKEN, USER_ROAD } from './constants/routes';
import { AuthentificationPage } from './features/authentification/pages/authentification-page/authentification-page';
import { HomePage } from './features/homepage/pages/home-page/home-page';
import { UserPage } from './features/profile/pages/user-page/user-page';

export const routes: Routes = [
    // Route lié à la vue administration
    // TODO: Mettre en place la gestion du role pour permettre le filtrage
    { path: ADMINPAGE_ROAD, component: AdminPage },
    // Routes liés à la vue d'authentification
    // Page de connexion
    { path: `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`, component: AuthentificationPage },
    // Page de création de compte
    { path: `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`, component: AuthentificationPage },
    // Redirections 
    { path: AUTHENTIFICATION_ROAD.ROOT, redirectTo: `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`, pathMatch: "full" },
    { path: `${AUTHENTIFICATION_ROAD.ROOT}/:anything`, redirectTo: `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}` },
    // Route lié à la page d'accueil
    { path: HOMEPAGE_ROAD, component: HomePage },
    // Route lié à la page personnelle de l'utilisateur
    { path: USER_ROAD, component: UserPage }, // TODO: ne permettre l'accès qu'aux utilisateurs log
    // La racine redirige automatique vers l'authentification connexion
    { path: "", redirectTo: `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`, pathMatch: "full" },
    // Toute route invalide redirige vers l'authentification connexion
    { path: `${STAR_TOKEN}`, redirectTo: `/${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}` }
];
