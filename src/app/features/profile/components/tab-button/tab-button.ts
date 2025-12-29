import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Tab } from '../../../../models/interfaces/tab';

@Component({
  selector: 'tab-button',
  templateUrl: './tab-button.html',
  styleUrl:'./tab-button.css'
})
export class TabButton {
  public tab: InputSignal<Tab> = input.required<Tab>();
  public isActive: InputSignal<boolean> = input.required<boolean>();
  public selected: OutputEmitterRef<string> = output<string>();

  select(): void {
    this.selected.emit(this.tab().id);
  }
}