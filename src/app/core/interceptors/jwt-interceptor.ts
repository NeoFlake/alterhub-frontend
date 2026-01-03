import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, from, of, switchMap } from 'rxjs';
import { BACKEND_API_USERS } from '../../constants/backend-api-road';
import { StateService } from '../services/state/state-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const stateService: StateService = inject(StateService);
  const accessToken: string | null = authService.getAccessToken();

  // Seule méthode qui nécessite que l'on shunt réellement tout le reste
  // Tout en envoyant jamais le cookie au backend
  if (req.url.includes(BACKEND_API_USERS.REGISTER)) {
    return next(req);
  }

  // Modifie la requête d'hydratation tout en l'empêchant de boucler avec
  // ce qu'il y a au dessous
  if (req.headers.has('x-hydration-request')) {
    const cleanReq = req.clone({
      headers: req.headers.delete('x-hydration-request'),
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
    return next(cleanReq);
  }

  // Ajoute l'envoi du cookie de manière dynamique aux requêtes qui le nécessitent
  if (
    req.url.includes(BACKEND_API_USERS.LOGIN) ||
    req.url.includes(BACKEND_API_USERS.LOGOUT) ||
    req.url.includes(BACKEND_API_USERS.REFRESH_TOKEN) ||
    req.url.includes(BACKEND_API_USERS.CHECK_COOKIE_STATUT) ||
    (req.method === "DELETE" && req.url.includes(BACKEND_API_USERS.ROOT))
  ) {
    return next(req.clone({ withCredentials: true }));
  }

  // On vérifie en premier lieu que l'utilisateur n'est pas un visiteur classique sans droit 
  if (stateService.cookieStatut() !== "guest") {
    if (!stateService.verifyExistenceOfUserStated()) {
      return from(stateService.refreshUserLogged()).pipe(
        switchMap(() =>
          authService.isTokenExpiringSoon() ? authService.refreshToken() : Promise.resolve(true)
        ),
        switchMap((success: boolean) => {
          if (!success) {
            authService.logout();
            return of(null as any);
          }

          const token = authService.getAccessToken()!;
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next(cloned);
        }),
        catchError(() => {
          authService.logout();
          return of(null as any);
        })
      );
    } else {
      if (authService.isTokenExpiringSoon()) {
        return from(authService.refreshToken()).pipe(
          switchMap((success: boolean) => {
            if (!success) {
              authService.logout();
              return of(null as any);
            }

            const token = authService.getAccessToken()!;
            const cloned = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next(cloned);
          }),
          catchError(() => {
            authService.logout();
            return of(null as any);
          })
        );
      }
    }
  }

  return next(req);
};
