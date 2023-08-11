import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

interface IdObj {
  _id: string;
  [key: string]: any;
}

@Pipe({
  name: 'ids'
})
export class IdsPipe implements PipeTransform {
  constructor(private utilityService: UtilityService) { }

  transform(values: IdObj[], suffix?: string): string[] {
    return values.map((value: IdObj) => value._id + (suffix ? `-${this.utilityService.toCamelCase(suffix)}` : ''));
  }

}
