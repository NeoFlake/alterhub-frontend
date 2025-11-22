import { NgComponentOutlet } from '@angular/common';
import { Component, input, InputSignal, Type } from '@angular/core';

@Component({
  selector: 'tab-panel',
  imports: [NgComponentOutlet],
  templateUrl: './tab-panel.html',
  styleUrl: './tab-panel.css',
  host: {
    '[hidden]': '!isActive()',
    'role': 'tabpanel',
    '[class.tab-pane]': 'true',
    '[class.fade]': 'true',
    '[class.show]': 'isActive()',
    '[class.active]': 'isActive()',
  }
})
export class TabPanel {

  public component: InputSignal<Type<any>> = input.required<Type<any>>();
  public isActive: InputSignal<boolean> = input.required<boolean>();
  public isLoaded: InputSignal<boolean> = input.required<boolean>();

}
