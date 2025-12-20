import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, from, of, switchMap } from 'rxjs';
import { BACKEND_API_USERS } from '../../constants/backend-api-road';
import { StateService } from '../services/state/state-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const stateService: StateService = inject(StateService);
  const accessToken: string|null = authService.getAccessToken();

  if (
    req.url.includes(BACKEND_API_USERS.REGISTER) ||
    req.url.includes(BACKEND_API_USERS.LOGIN) ||
    req.url.includes(BACKEND_API_USERS.REFRESH_TOKEN)
  ) {
    return next(req);
  }
  if (req.headers.get('x-skip-interceptor')) return next(req);

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
          setHeaders: { Authorization: `Bearer ${token}`, "x-skip-interceptor": 'true' },
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
      return from(authService.refreshToken())
      .pipe(
        switchMap((success: boolean) => {
          if (!success) {
            authService.logout();
            return of(null as any);
          }

          const token = authService.getAccessToken()!;
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}`, "x-skip-interceptor": 'true' },
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

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}`, "x-skip-interceptor": 'true' },
    withCredentials: true,
  });
  return next(cloned);
};
