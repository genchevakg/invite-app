import { Pipe, PipeTransform } from '@angular/core';
import { SortOrder } from '../../enums/sort-order.enum';
import { CounterpartyName } from '../../models/counterparty-name.model';

type SortableObject = {name: CounterpartyName; [key: string]: any;};
type SortableValues = [string, any][] | SortableObject[];

@Pipe({
  name: 'sortValues'
})
export class SortValuesPipe implements PipeTransform {

  transform<T>(values: T[], sortOrder?: SortOrder): T[] {
    if (!values || !values.length || !sortOrder) {
      return values;
    }
    const updatedValues: T[] = JSON.parse(JSON.stringify(values));
    if (Array.isArray(values[0]) && typeof values[0][0] === 'string') {
      return updatedValues.sort((a, b) => this.compareValues((a as [string, any])[0], (b as [string, any])[0], sortOrder));
    }
    return updatedValues.sort((a, b) => {
      const firstObj: SortableObject = a as SortableObject;
      const secondObj: SortableObject = b as SortableObject;
      return this.compareValues(this.getName(firstObj.name), this.getName(secondObj.name), sortOrder)
    });
  }

  private compareValues(a: string, b: string, sortOrder: SortOrder) {
    return sortOrder === SortOrder.asc ? a.localeCompare(b) : b.localeCompare(a);
  }

  private getName(name: CounterpartyName): string {
    return `${name.first} ${name.last}`;
  }

}
