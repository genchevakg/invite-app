import { Pipe, PipeTransform } from '@angular/core';
import { Counterparty } from '../../models/counterparty.model';
import { CounterpartyGroup } from '../../models/counterparty-group.model';
import { CounterpartyGroups } from '../../models/counterparty-groups.model';

@Pipe({
  name: 'counterpartyGroups'
})
export class CounterpartyGroupsPipe implements PipeTransform {

  transform(counterparties: Counterparty[]): CounterpartyGroup[] {
    return Object.entries(counterparties.reduce((counterpartyGroups: CounterpartyGroups, counterparty: Counterparty) => {
        if (counterparty.groups) {
          counterparty.groups.forEach((group: string) =>
            group in counterpartyGroups ? counterpartyGroups[group].push(counterparty) : counterpartyGroups[group] = [counterparty]
          )
        }
        return counterpartyGroups;
      },{} as CounterpartyGroups));
  }

}
