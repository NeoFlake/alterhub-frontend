import { Component, ElementRef, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Hero } from '../../../../models/interfaces/api/hero';
import { HERO_LIST_LIBELLE, MODAL_LIBELLE } from '../../../../constants/administration.constantes';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';

@Component({
  selector: 'hero-detail-modal',
  imports: [],
  templateUrl: './hero-detail-modal.html',
  styleUrl: './hero-detail-modal.css',
})
export class HeroDetailModal {

  private elementRef: ElementRef = inject(ElementRef);

  public hero: InputSignal<Hero | null> = input.required<Hero | null>();
  public closeModal: OutputEmitterRef<void> = output<void>();

  private modalInstance: any;
  private modalElement: HTMLElement|null = null;

  public isColored: boolean = false;

  public modalLibelle: typeof MODAL_LIBELLE = MODAL_LIBELLE;
  public backApiRoads: typeof BACKEND_API_ROADS = BACKEND_API_ROADS;
  public heroListLibelle: typeof HERO_LIST_LIBELLE = HERO_LIST_LIBELLE;

  // Cette construction syntaxique est primordiale car
  // elle permet de conserver sur le this le contexte d'où il provient
  private onCloseModal = () => this.closeModal.emit();

  ngAfterViewInit(){

    const bootstrap: any = (window as any).bootstrap;

    if(!bootstrap) return;

    this.modalElement = this.elementRef.nativeElement.querySelector(".modal");

    if(this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement);
      this.modalElement.addEventListener("hidden.bs.modal", this.onCloseModal);
      this.modalInstance.show();
    }

  }

  ngOnDestroy(){

    if(this.modalElement) {
      this.modalElement.removeEventListener("hidden.bs.modal", this.onCloseModal);
    }
    if(this.modalInstance){
      // Permet de flush les ressources, évitant d'éventuelle fuites mémoires (probable, mais mieux vaut prévenir que guérir)
      this.modalInstance.dispose();
    }

  }

  public switchColorisationMode(): void {
    this.isColored = !this.isColored;
  }

}
