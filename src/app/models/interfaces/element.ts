import { Identifiable } from "./identifiable";

export interface Element extends Identifiable {
    echoEffect: string,
    forestPower: string,
    mainCost: string,
    mainEffect: string,
    mountainPower: string,
    oceanPower: string,
    recallCost: string
}