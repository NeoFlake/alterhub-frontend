import { Deck } from "./deck";
import { Identifiable } from "./identifiable";
import { Participant } from "./participant";

export interface Player extends Identifiable {
    decks: Array<Deck>;
    name: string;
    participants: Array<Participant>;
    userId: string;
}