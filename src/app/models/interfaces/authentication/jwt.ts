import { JwtPayload } from "./jwt-payload";

export class Jwt {
    
  constructor(private payload: JwtPayload) {}

  get sub(): string { return this.payload.sub; }
  get accessGranted(): boolean { return this.payload.accessGranted; }
  get iat(): number { return this.payload.iat; }
  get exp(): number { return this.payload.exp; }
  get raw(): any { return this.payload.raw; }

  isExpired(): boolean {
    return this.exp * 1000 < Date.now();
  }
}