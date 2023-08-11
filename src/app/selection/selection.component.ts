import { Component, OnInit } from '@angular/core';
import { CounterpartiesStateService } from '../shared/services/counterparties-state.service';
import { CounterpartiesState } from '../shared/models/counterparties-state.model';
import { Observable } from 'rxjs';
import { CounterpartyStatus } from '../shared/models/counterparty-status.model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  selectedCounterparties$!: Observable<Partial<CounterpartyStatus>[]>;

  constructor(private counterpartiesStateService: CounterpartiesStateService) {}

  ngOnInit(): void {
    this.selectedCounterparties$ = this.counterpartiesStateService.getSelectedCounterparties();
  }

  
  removeCounterpartySelection(counterparty: CounterpartyStatus) {
    this.counterpartiesStateService.removeCounterpartySelection(counterparty);
  }

}
