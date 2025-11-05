import { Routes } from '@angular/router';
import { AdminPage } from './features/admin/pages/admin-page/admin-page';
import { ADMINPAGE_ROAD } from './constants/routes';

export const routes: Routes = [
    { path: `${ADMINPAGE_ROAD}`, component: AdminPage }
];
