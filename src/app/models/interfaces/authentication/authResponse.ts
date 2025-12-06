import { User } from "../users/user";

export interface AuthResponse {
    accessToken: string;
    user: User;
}