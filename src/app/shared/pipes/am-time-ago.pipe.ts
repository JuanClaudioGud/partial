import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'amTimeAgo'
})
export class AmTimeAgoPipe implements PipeTransform {

  public transform(value: Moment): string {
    return value.fromNow();
  }

}
