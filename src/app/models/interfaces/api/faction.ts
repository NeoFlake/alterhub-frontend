import { Reference } from "./reference";

export interface Faction extends Reference {
    factionId: string;
    color: string;
}