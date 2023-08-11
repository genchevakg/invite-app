import { Component, EventEmitter, Output } from '@angular/core';
import { SortOrder } from '../shared/enums/sort-order.enum';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.component.html',
  styleUrls: ['./sort-select.component.scss']
})
export class SortSelectComponent {
  @Output() sort: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();

  SortOrder = SortOrder;

  sortValues(order: SortOrder): void {
    this.sort.emit(order);
  }
}
