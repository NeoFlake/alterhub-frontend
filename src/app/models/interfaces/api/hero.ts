import { Faction } from "./faction";
import { Identifiable } from "./identifiable";

export interface Hero extends Identifiable {
    effect: string;
    faction: Faction;
    landmarkSlot: number; 
    name: string;
    reserveSlot: number;
}