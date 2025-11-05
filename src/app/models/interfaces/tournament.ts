import { Identifiable } from "./identifiable";
import { Participant } from "./participant";

export interface Tournament extends Identifiable {
    date: string;
    location: string;
    name: string;
    numberOfPlayers: number;
    participants: Array<Participant>;
}