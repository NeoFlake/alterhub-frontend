import { Routes } from '@angular/router';
import { AdminPage } from './features/admin/pages/admin-page/admin-page';
import { ADMINPAGE_ROAD, AUTHENTIFICATION_ROAD, STAR_TOKEN } from './constants/routes';
import { AuthentificationPage } from './features/authentification/pages/authentification-page/authentification-page';

export const routes: Routes = [
    { path: `${ADMINPAGE_ROAD}`, component: AdminPage },
    {
        path: `${AUTHENTIFICATION_ROAD.ROOT}`, component: AuthentificationPage,
        children: [
            { path: `${AUTHENTIFICATION_ROAD.LOGIN}`, component: AuthentificationPage },
            { path: `${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`, component: AuthentificationPage },
            { path: `${STAR_TOKEN}`, redirectTo: `${AUTHENTIFICATION_ROAD.LOGIN}`, pathMatch: "full" }
        ]
    }
];
