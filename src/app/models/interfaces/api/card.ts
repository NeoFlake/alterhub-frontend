import { Element } from "./element";
import { Faction } from "./faction";
import { Rarity } from "./rarity";
import { Reference } from "./reference";
import { SubType } from "./subtype";
import { Type } from "./type";

export interface Card extends Reference {
    alteredId: string;
    element: Element;
    faction: Faction;
    image: string;
    reference: string;
    isBanned: boolean;
    isErrated: boolean;
    isSuspended: boolean;
    rarity: Rarity;
    subTypes: Array<SubType>;
    type: Type
}