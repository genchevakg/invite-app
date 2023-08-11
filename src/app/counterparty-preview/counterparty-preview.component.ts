import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counterparty-preview',
  templateUrl: './counterparty-preview.component.html',
  styleUrls: ['./counterparty-preview.component.scss']
})
export class CounterpartyPreviewComponent {
  @Input() picture!: string;
  @Input() email!: string;

  @Output() deleteEntry: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteCounterparty() {
    this.deleteEntry.emit(true);
  }
}
