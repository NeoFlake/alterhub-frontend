import { Type, WritableSignal } from "@angular/core";

export interface Tab {
    id: string; // Permet d'identifier l'onglet que l'on a cliqué pour afficher le panneau  adéquat
    title: string; // Titre de l'onglet
    component: Type<any>; // Composant que l'on souhaite nicher dans le panel appelé (permet d'afficher la bonne vue dans le panneau adéquat)
}