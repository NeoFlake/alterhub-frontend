import { Faction } from "./faction";
import { Identifiable } from "./identifiable";
import { Set } from './set';

export interface Hero  
 {
    id?: string,
    effect: string;
    faction: Faction;
    sets: Array<Set>;
    landmarkSlot: number; 
    name: string;
    reserveSlot: number;
    image: string;
}