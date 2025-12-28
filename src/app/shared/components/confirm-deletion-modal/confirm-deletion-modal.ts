import {
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { BUTTONS_LIBELLE } from '../../../constants/modals.constant';

@Component({
  selector: 'confirm-deletion-modal',
  imports: [],
  templateUrl: './confirm-deletion-modal.html',
  styleUrl: './confirm-deletion-modal.css',
})
export class ConfirmDeletionModal {
  private elementRef: ElementRef = inject(ElementRef);

  public deleteModalData: InputSignal<{
    title: string;
    body: string;
  }> = input.required<{ title: string; body: string }>();

  public closeModal: OutputEmitterRef<boolean> = output<boolean>();

  private modalInstance: any;
  private modalElement: HTMLElement | null = null;

  // On l'initialise à false car on souhaite valider
  // uniquement lorsque l'utilisateur confirme l'action de destruction de l'élément
  private isConfirm: boolean = false;

  // Petit test fructueux sur l'assemblage des typeof en un seul objet
  public buttonsLibelle: typeof BUTTONS_LIBELLE = BUTTONS_LIBELLE;

  // Cette construction syntaxique est primordiale car
  // elle permet de conserver sur le this le contexte d'où il provient
  private onCloseModal = () => this.closeModal.emit(this.isConfirm);

  ngAfterViewInit() {
    const bootstrap: any = (window as any).bootstrap;

    if (!bootstrap) return;

    this.modalElement = this.elementRef.nativeElement.querySelector('.modal');

    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement);
      this.modalElement.addEventListener('hidden.bs.modal', this.onCloseModal);
      this.modalInstance.show();
    }
  }

  ngOnDestroy() {
    if (this.modalElement) {
      this.modalElement.removeEventListener('hidden.bs.modal', this.onCloseModal);
    }
    if (this.modalInstance) {
      // Permet de flush les ressources, évitant d'éventuelle fuites mémoires (probable, mais mieux vaut prévenir que guérir)
      this.modalInstance.dispose();
    }
  }

  public onCancel(): void {
    this.modalInstance.hide();
  }

  public onConfirm(): void {
    // On passe le flag de confirmation suppression à true
    this.isConfirm = true;
    this.modalInstance.hide();
  }
}
