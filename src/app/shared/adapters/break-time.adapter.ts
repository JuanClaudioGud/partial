import { TIMEZONE } from '@app/constants';
import { Adapter } from '../interfaces';
import { BreakTime } from '../models';
import { WorkingDayAdapter } from './working-day.adapter';
import * as moment from 'moment-timezone';

export class BreakTimeAdapter implements Adapter<BreakTime> {

  constructor(public format: string = 'HH:mm') { }

  public deserialize(data: any): BreakTime {
    return new BreakTime(
      data.id,
      new WorkingDayAdapter().deserialize(data.workingDay),
      moment.tz(data.startTime, this.format, TIMEZONE),
      moment.tz(data.endTime, this.format, TIMEZONE),
      data.reason
    );
  }

  public serialize(data: BreakTime): any {
    return { 
      id: data.id,
      workingDay: data.workingDay.id,
      startTime: data.startTime.format(this.format),
      endTime: data.endTime.format(this.format),
      reason: data.reason,
    };
  }
 
}