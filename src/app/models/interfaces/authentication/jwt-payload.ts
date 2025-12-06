export interface JwtPayload {
  sub: string;          
  accessGranted: boolean; 
  iat: number;           
  exp: number;           
  raw: any;              
}