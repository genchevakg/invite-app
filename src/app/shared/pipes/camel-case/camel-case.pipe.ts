import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {
  constructor(private utilityService: UtilityService) { }

  transform(value: string): string {
    return this.utilityService.toCamelCase(value);
  }

}
