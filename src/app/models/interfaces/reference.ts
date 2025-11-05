import { Identifiable } from "./identifiable";

export interface Reference extends Identifiable {
    name: string;
    reference: string;
}