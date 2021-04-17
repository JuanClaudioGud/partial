import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PusherEvent } from '@app/shared/interfaces';
import { PusherEventType } from '@app/shared/enums';
import { LoadingService } from '@app/shared/services';
import { Notification } from '../../models';
import { NotificationType } from '../../enums';
import { NotificationAdapter } from '../../adapters';
import { NotificationsService } from '../../services';
import { NotificationDetailsComponent } from '../notification-details';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { indicate } from '@app/rxjs-operators';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html',
  styleUrls: ['./notifications-icon.component.scss']
})
export class NotificationsIconComponent implements OnInit {

  NotificationType = NotificationType;

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  private _notifications: Notification[] = [];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly loadingService: LoadingService,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.watchLoading();
    this.getNotifications();
  }

  private watchLoading(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    );
  }

  private getNotifications(): void {
    this.notificationsService.getAll().pipe(
      tap(() => this.listenEvents()),
    ).subscribe((notifications: Notification[]): void => {
      this._notifications = notifications.reverse();
    });
  }

  public get notifications(): Notification[] {
    return this._notifications.filter((notification: Notification): boolean => {
      return notification.read === false;
    });
  }

  private listenEvents(): void {
    this.notificationsService.events$.subscribe(({ 
      eventType, 
      payload 
    }: PusherEvent): void => {
      switch (eventType) {
        case PusherEventType.NOTIFICATION_CREATE_ONE: {
          this.addNotification(payload);
          break;
        }
        case PusherEventType.NOTIFICATION_UPDATE_ONE: {
          this.updateNotification(payload);
          break;
        }
        case PusherEventType.NOTIFICATION_DELETE_MANY: {
          this.deleteNotifications(payload);
          break;
        }
      }
    });
  }

  private addNotification(payload: Notification): void {
    this._notifications.unshift(payload);
  }

  private updateNotification(payload: Notification): void {
    this._notifications = this._notifications.map((notification: Notification): Notification => {
      return notification.id === payload.id ? payload : notification;
    });    
  }

  private deleteNotifications(payload: Notification[]): void {
    this._notifications = this._notifications.filter((notification: Notification): boolean => {
      return !payload.some((item: Notification): boolean => {
        return notification.id === item.id;
      });
    });    
  }


  public onClick(data: Notification): void {
    this.dialog.open(NotificationDetailsComponent, { data });
  }

  public onClose(event: MouseEvent, item: Notification): void {

    const notification: Notification = new NotificationAdapter()
    .deserialize({
      ... item,
      read: true,
    });

    this.notificationsService.updateOne(notification).pipe(
      indicate(this.loading$)
    ).subscribe((): void => {
      this._notifications = this._notifications.filter((notification: Notification): boolean => {
        return notification.id !== item.id;
      })
    });
  }

}