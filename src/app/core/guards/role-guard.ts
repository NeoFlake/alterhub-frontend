import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { AUTHENTIFICATION_ROAD, HOMEPAGE_ROAD } from '../../constants/routes';
import { Jwt } from '../../models/interfaces/authentication/jwt';

export const roleGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const token = authService.getAccessToken();
  
  if(!token){
    router.navigate([AUTHENTIFICATION_ROAD.ROOT, AUTHENTIFICATION_ROAD.LOGIN]);
    return false;
  }

  const jwt: Jwt|null = authService.decodePayload(token);
  if(!jwt){
    authService.logout();
    return false;
  }
  
  if(jwt.accessGranted){
    return true;
  }

  router.navigate([HOMEPAGE_ROAD]);
  return false;
};
