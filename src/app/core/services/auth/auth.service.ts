import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, finalize, firstValueFrom, map, of } from 'rxjs';
import { UserRepository } from '../api/backend/user.repository';
import { AuthResponse } from '../../../models/interfaces/authentication/authResponse';
import { KEY_ACCESS } from '../../../constants/authentification-page.constantes';
import { JwtPayload } from '../../../models/interfaces/authentication/jwt-payload';
import { Jwt } from '../../../models/interfaces/authentication/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRepository: UserRepository = inject(UserRepository);

  private accessToken: WritableSignal<string | null> = signal<string | null>(
    this.readAccessTokenFromStorage()
  );

  public isAuthenticated: Signal<boolean> = computed(() => {
    const token: string | null = this.accessToken();
    return !!token && !this.isTokenExpired(token);
  });

  private refreshInProgress: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  public async refreshToken(): Promise<boolean> {
    if (this.refreshInProgress && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshInProgress = true;

    this.refreshPromise = firstValueFrom(
      this.userRepository.refreshToken().pipe(
        map((authResponse: AuthResponse|null|undefined) => {
          if(!authResponse?.accessToken) throw new Error("Erreur provenant du serveur");
          this.setAccessToken(authResponse.accessToken);
          return true;
        }),
        catchError(() => {
          this.logout();
          this.userRepository.logout();
          return of(false);
        }),
        finalize(() => {
          this.refreshInProgress = false;
          this.refreshPromise = null;
        })
      )
    );

    return this.refreshPromise;
  }

  public login(authResponse: AuthResponse): void {
    this.accessToken.set(authResponse.accessToken);
    localStorage.setItem(KEY_ACCESS, authResponse.accessToken);
  }

  public logout(): void {
    this.clearAccessToken();
  }

  public getAccessToken(): string | null {
    return this.accessToken();
  }

  private setAccessToken(token: string): void {
    this.accessToken.set(token);
    localStorage.setItem(KEY_ACCESS, token);
  }

  private clearAccessToken() {
    this.accessToken.set(null);
    localStorage.removeItem(KEY_ACCESS);
  }

  private readAccessTokenFromStorage(): string | null {
    try {
      return localStorage.getItem(KEY_ACCESS);
    } catch {
      return null;
    }
  }

  public decodePayload(token: string | null): Jwt | null {
    if (!token) return null;
    try {
      const [, payloadBase64] = token.split('.');
      if (!payloadBase64) return null;

      const payloadJson = decodeURIComponent(
        atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const parsedPayload = JSON.parse(payloadJson);

      const payload: JwtPayload = {
        sub: parsedPayload.sub,
        accessGranted: parsedPayload.accessGranted,
        iat: parsedPayload.iat,
        exp: parsedPayload.exp,
        raw: parsedPayload,
      };

      return payload.sub && payload.accessGranted !== undefined ? new Jwt(payload) : null;
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload?.exp) return true;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSec;
  }

  public isTokenExpiringSoon(secondsThreshold = 60): boolean {
    const token: string | null = this.accessToken();
    if (!token) return true;
    const payload: Jwt | null = this.decodePayload(token);
    if (!payload?.exp) return true;
    const nowSec: number = Math.floor(Date.now() / 1000);
    return payload.exp - nowSec <= secondsThreshold;
  }

  public async ensureValidToken(): Promise<boolean> {
    const token: string | null = this.accessToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    return this.refreshToken();
  }

  public async getJwtUserId(): Promise<string> {
    await this.ensureValidToken();
    // Le fait que ensureValidToken nous déconnecte si le refresher est périmé
    // nous assure que nous avons rafraichit le jwt au moment où on renvoit son userId
    return this.decodePayload(this.accessToken())!.sub!;
  }

  public isAccessGrantedForUser(): boolean {
    // Le fait que l'on valide la réalité du jeton à chaque appel avec l'interceptor
    // Certifie que si quelque chose ne va pas nous sommes déconnecté depuis longtempssss
    return this.decodePayload(this.accessToken())!.accessGranted;
  }

  public isAccessRefuseForUser(): boolean {
    // Le fait que l'on valide la réalité du jeton à chaque appel avec l'interceptor
    // Certifie que si quelque chose ne va pas nous sommes déconnecté depuis longtempssss
    return this.decodePayload(this.accessToken())!.accessGranted === false;
  }

}
