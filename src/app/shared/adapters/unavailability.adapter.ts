import { TIMEZONE } from '@app/constants';
import { Adapter } from '../interfaces';
import { Unavailability } from '../models';
import * as moment from 'moment-timezone';

export class UnavailabilityAdapter implements Adapter<Unavailability> {

  constructor(public format: string = 'YYYY-MM-DD') { }

  public deserialize(data: any): Unavailability {
    return new Unavailability(
      data.id,
      moment.tz(data.startDate, this.format, TIMEZONE),
      moment.tz(data.endDate, this.format, TIMEZONE),
      data.reason,
    );
  }

  public serialize(data: Unavailability): any {
    return {
      id: data.id,
      startDate: data.startDate.format(this.format),
      endDate: data.endDate.format(this.format), 
      reason: data.reason,
    };
  }

}