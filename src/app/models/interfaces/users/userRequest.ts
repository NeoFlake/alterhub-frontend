import { User } from "./user";

export interface UserRequest extends User {
    password: string;
    newPassword: string;
}