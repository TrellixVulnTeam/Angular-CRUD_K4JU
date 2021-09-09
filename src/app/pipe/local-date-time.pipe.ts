import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(name: string, ...args: unknown[]): string {
    let nameOut: string = name[0] 
    return nameOut.toUpperCase();
  }

}
