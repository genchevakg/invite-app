import { Injectable } from '@angular/core';
import { CounterpartiesState } from '../models/counterparties-state.model';
import { CounterpartiesService } from './counterparties.service';
import { BehaviorSubject, Observable, filter, finalize, map, of, take, tap } from 'rxjs';
import { Counterparty } from '../models/counterparty.model';
import { CounterpartyStatus } from '../models/counterparty-status.model';

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesStateService {
  private INITIAL_STATE: CounterpartiesState = {
    counterparties: [],
    loading: false,
    addedEmails: []
  };
  private counterpartiesState: BehaviorSubject<CounterpartiesState> = new BehaviorSubject({...this.INITIAL_STATE});

  constructor(private counterpartiesService: CounterpartiesService) { }

  getCounterparties(): Observable<CounterpartiesState> {
    if (!this.counterpartiesState.value.counterparties?.length) {
      this.counterpartiesState.next({...this.counterpartiesState.value, loading: true});
      this.counterpartiesService.getCounterparties()
        .pipe(
          take(1),
          tap((counterparties: Counterparty[]) => {
            this.counterpartiesState.next({
              counterparties: counterparties.map((counterparty: Counterparty) => ({...counterparty, selected: false})),
              loading: false,
              addedEmails: this.counterpartiesState.value.addedEmails
            });
          }),
          finalize(() => {
            if (this.counterpartiesState.value.loading) {
              this.counterpartiesState.next({...this.counterpartiesState.value, loading: false})
            }
          })
        ).subscribe();
    }
    return this.counterpartiesState.pipe(
      map(({counterparties, loading}: CounterpartiesState) => ({counterparties, loading}))
    );
  }

  getSelectedCounterparties(): Observable<Partial<CounterpartyStatus>[]> {
    return this.counterpartiesState.pipe(
      map((state: CounterpartiesState) => {
        const selectedCounterparties: Partial<CounterpartyStatus>[] = 
          state.counterparties.filter((counterparty: CounterpartyStatus) => counterparty.selected);
        const addedEmails: Partial<CounterpartyStatus>[] =
          state.addedEmails?.map((email: string) => ({email} as Partial<CounterpartyStatus>)) || [];
        return selectedCounterparties.concat(addedEmails);
      })
    );
  }

  setSelectedCounterparties(selectedIds: string[]): void {
    const updatedCounterparties: CounterpartyStatus[] = [...this.counterpartiesState.value.counterparties];
    updatedCounterparties.forEach((counterparty: CounterpartyStatus) => {
      if (selectedIds.includes(counterparty._id)) {
        counterparty.selected = true;
      }
    });
    this.counterpartiesState.next({...this.counterpartiesState.value, counterparties: updatedCounterparties});
  }

  areCounterpartiesSelected(): Observable<boolean> {
    return this.counterpartiesState.pipe(
      map((state: CounterpartiesState) => !!state.counterparties?.length || !!state.addedEmails?.length));
  }

  addEmail(email: string): void {
    const emails: string[] = [...this.counterpartiesState.value.addedEmails!];
    if (!emails.includes(email)) {
      emails.push(email);
    }
    this.counterpartiesState.next({...this.counterpartiesState.value, addedEmails: emails});
  }

  removeCounterpartySelection(selectedCounterparty: Partial<CounterpartyStatus>): void {
    if (selectedCounterparty._id) {
      const updatedCounterparties: CounterpartyStatus[] = [...this.counterpartiesState.value.counterparties];
      const counterparty: CounterpartyStatus | undefined = updatedCounterparties.find((counterparty: CounterpartyStatus) => counterparty._id === selectedCounterparty._id);
      if (counterparty) {
        counterparty.selected = false;
      }
      this.counterpartiesState.next({...this.counterpartiesState.value, counterparties: updatedCounterparties});
    } else if (selectedCounterparty.email) {
      const emails: string[] = this.counterpartiesState.value.addedEmails?.filter((addedEmail: string) => addedEmail !== selectedCounterparty.email) || [];
      this.counterpartiesState.next({...this.counterpartiesState.value, addedEmails: emails});
    }
  }
  
}
