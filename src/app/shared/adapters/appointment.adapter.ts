import { TIMEZONE } from '@app/constants';
import { Adapter } from '../interfaces';
import { Appointment } from '../models';
import { TreatmentAdapter } from './treatment.adapter';
import * as moment from 'moment-timezone';

export class AppointmentAdapter implements Adapter<Appointment> {

  constructor(public format?: string) {}

  public deserialize(data: any): Appointment {
    return new Appointment(
      data.id,
      data.name,
      data.email,
      data.phone,
      new TreatmentAdapter().deserialize(data.treatment),
      this.format 
      ? moment.tz(data.date, this.format, TIMEZONE) 
      : moment.tz(data.date, TIMEZONE),
      data.status
    );
  }

  public serialize(data: Appointment): any {
    return { 
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      treatment: data.treatment.id,
      date: this.format 
      ? data.date.format(this.format) 
      : data.date.format(),
      status: data.status,
    };
  }

}