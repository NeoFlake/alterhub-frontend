import { Component, input, InputSignal, output } from '@angular/core';
import { Page } from '../../../models/interfaces/api/page';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination<T> {

  public page: InputSignal<Page<T>> = input.required<Page<T>>();

  public paginationColor: InputSignal<string> = input<string>("");

  public pageSelect = output<number>();

  public onPageSelect(pageSelected: number): void {
    this.pageSelect.emit(pageSelected);
  }

}
