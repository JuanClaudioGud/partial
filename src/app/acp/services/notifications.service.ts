import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { ListenerService } from '@app/shared/services';
import { PusherEventType } from '@app/shared/enums';
import { Notification } from '../models';
import { NotificationAdapter } from '../adapters';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends ListenerService<Notification> {

  constructor() { 
  	super(env.api.endpoints.notifications, new NotificationAdapter(), [
      PusherEventType.NOTIFICATION_CREATE_ONE, 
      PusherEventType.NOTIFICATION_UPDATE_ONE,
      PusherEventType.NOTIFICATION_DELETE_ONE,
      PusherEventType.NOTIFICATION_DELETE_MANY,
    ]);
  }

  public getUnread(): Observable<Notification[]> {
    return this.http.get(`${ this.resourceEndpoint }/unread`).pipe(
      map((resources: any): Notification[] => {
        return resources.map((resource: any): Notification => {
          return this.resourceAdapter.deserialize(resource);
        })
      })
    );
  }

}