import { Deck } from "./deck";
import { Identifiable } from "./identifiable";

export interface Participant extends Identifiable {
    classement: number;
    deck: Deck;
    playerName: string;
    score: string;
    tournamentId: string;
}