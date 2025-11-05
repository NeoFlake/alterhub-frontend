import { Card } from "./card";
import { Faction } from "./faction";
import { Hero } from "./hero";
import { Identifiable } from "./identifiable";
import { Tag } from "./tag";

export interface Deck extends Identifiable {
    cards: Array<Card>;
    dateOfCreation: string;
    description: string;
    faction: Faction;
    hero: Hero;
    lastModification: Date;
    name: string;
    playerId: string;
    tags: Array<Tag>;
}