import { TIMEZONE } from '@app/constants';
import { Adapter } from '@app/shared/interfaces';
import { AppointmentAdapter } from '@app/shared/adapters';
import { Notification } from '../models';
import * as moment from 'moment-timezone';

export class NotificationAdapter implements Adapter<Notification> {

  constructor() {}

  public deserialize(data: any): Notification {
    return new Notification(
      data.id,
      new AppointmentAdapter().deserialize(data.payload),
      data.type,
      data.read,
      moment.tz(data.created_at, TIMEZONE),
    );
  }

  public serialize(data: Notification): any {
    return { 
      id: data.id,
      payload: data.payload,
      type: data.type,
      read: data.read,
    };
  }

}
