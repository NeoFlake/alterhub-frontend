export interface UserRequest {
    id?: string;
    dateOfCreation: string;
    email: string;
    firstName: string;
    lastModification: Date;
    lastName: string;
    playerName: string;
    password: string;
    newPassword?: string;
}