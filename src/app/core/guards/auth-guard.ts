import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { AUTHENTIFICATION_ROAD } from '../../constants/routes';
import { StateService } from '../services/state/state-service';

export const authGuard: CanActivateFn = async () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const stateService: StateService = inject(StateService);

  if (authService.isAuthenticated()) {
    if(!stateService.verifyExistenceOfUserStated()){
      await stateService.refreshUserLogged();
        return true;
    } else {
      return true;
    }
  }
  
  const valid: boolean = await authService.ensureValidToken();

  if (valid) {
    if(!stateService.verifyExistenceOfUserStated()){
      await stateService.refreshUserLogged();
      return true;
    } else {
      return true;
    }
  }

  router.navigate([AUTHENTIFICATION_ROAD.ROOT, AUTHENTIFICATION_ROAD.LOGIN]);
  return false;
};
