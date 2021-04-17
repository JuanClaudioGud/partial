import { Resource } from '../interfaces';
import { AppointmentStatus } from '../enums';
import { Treatment } from './treatment.model';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

export class Appointment implements Resource {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public treatment: Treatment,
    public date: Moment,
    public status: AppointmentStatus
  ) { }

  public getFormattedTime(tokenFormat: string = 'HH:mm'): Moment {
    const time: string = this.date.format(tokenFormat);
    return moment(time, tokenFormat);
  }

}