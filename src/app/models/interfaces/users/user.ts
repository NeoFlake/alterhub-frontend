import { Identifiable } from "../identifiable";

export interface User extends Identifiable {
    dateOfCreation: string;
    email: string;
    firstName: string;
    lastModification: Date;
    lastName: string;
    playerName: string;
}