import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PusherEvent } from '@app/shared/interfaces';
import { PusherEventType } from '@app/shared/enums';
import { Notification } from '../../models';
import { NotificationType } from '../../enums';
import { NotificationAdapter } from '../../adapters';
import { NotificationsService } from '../../services';
import { NotificationDetailsComponent } from '../notification-details';
import { ListComponent } from '../list';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  NOTIFICATION_UPDATE_SUCCESS_MSG, 
  NOTIFICATION_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends ListComponent<Notification> implements OnInit  {

	NotificationType = NotificationType;

	@Input()
	public notifications!: Notification[];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(notificationsService);
  }

  public ngOnInit(): void {
  	this.items = this.notifications;
    this.listenEvents();
  }

  private listenEvents(): void {
    this.notificationsService.events$.subscribe(({
      eventType, 
      payload
    }: PusherEvent): void => {
      switch (eventType) {
        case PusherEventType.NOTIFICATION_CREATE_ONE: {
          this.addItem(payload);
          break;
        }
        case PusherEventType.NOTIFICATION_UPDATE_ONE: {
          this.editItem(payload);
          break;
        }
      }
    });
  }

  public changeStatus(notification: Notification, read: boolean): void {

    const data = new NotificationAdapter().deserialize({ 
      ... notification, 
      read,
    });

    this.editResource(data).subscribe((): void => {
      this.snackBar.open(NOTIFICATION_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
    });
  }


  public delete(selectedItems: Notification[]): void {
    this.deleteResources(selectedItems).subscribe((): void => {
       this.snackBar.open(NOTIFICATION_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    });
  }

  public view(selectedRow: Notification): void {
    this.dialog.open(NotificationDetailsComponent, {
    	data: selectedRow,
    });
  }

}
