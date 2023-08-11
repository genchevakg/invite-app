import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxStatus } from '../../enums/checkbox-status.enum';

@Pipe({
  name: 'checkboxStatus'
})
export class CheckboxStatusPipe implements PipeTransform {

  transform(values: {[key: string]: boolean;}, ids: string[]): CheckboxStatus {
    const relatedOptionValues: boolean[] = Object.entries(values)
      .filter(([controlId,]: [string, boolean]) => ids.includes(controlId))
      .map(([, value]: [string, boolean]) => value);
    const checkedOptions: number = relatedOptionValues.reduce(((acc, currentValue) => currentValue ? acc + 1 : acc), 0);
    
    if(checkedOptions === 0) {
      return CheckboxStatus.unchecked;
    }
    if(checkedOptions === relatedOptionValues.length) {
      return CheckboxStatus.checked;
    }
    return CheckboxStatus.partial;
  }

}
