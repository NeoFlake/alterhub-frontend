import { Card } from "./card";
import { Faction } from "./faction";
import { Hero } from "./hero";
import { Identifiable } from "./identifiable";
import { Tag } from "./tag";

export interface Deck {
    id?: string;
    cards: Array<Card>;
    dateOfCreation: string;
    faction: Faction;
    hero: Hero;
    lastModification: Date;
    name: string;
    playerId: string;
    tags: Array<Tag>;
}