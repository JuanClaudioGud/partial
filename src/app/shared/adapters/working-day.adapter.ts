import { TIMEZONE } from '@app/constants';
import { Adapter } from '../interfaces';
import { WorkingDay } from '../models';
import * as moment from 'moment-timezone';

export class WorkingDayAdapter implements Adapter<WorkingDay> {

  constructor(public format: string = 'HH:mm') { }

  public deserialize(data: any): WorkingDay {
    return new WorkingDay( 
      data.id,
      data.weekDayId,
      moment.tz(data.openingHour, this.format, TIMEZONE),
      moment.tz(data.closingHour, this.format, TIMEZONE),
      data.status, 
    );
  }

  public serialize(data: WorkingDay): any {
    return {
      id: data.id,
      weekDayId: data.weekDayId,
      openingHour: data.openingHour.format(this.format),
      closingHour: data.closingHour.format(this.format),
      status: data.status, 
    };
  }

}