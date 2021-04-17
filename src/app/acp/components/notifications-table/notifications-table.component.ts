import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PusherEvent } from '@app/shared/interfaces';
import { PusherEventType } from '@app/shared/enums';
import { Notification } from '../..//models';
import { NotificationType } from '../../enums';
import { NotificationAdapter } from '../../adapters';
import { NotificationsService } from '../../services';
import { NotificationDetailsComponent } from '../notification-details';
import { TableComponent } from '../table';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  NOTIFICATION_UPDATE_SUCCESS_MSG, 
  NOTIFICATION_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.scss'],
})
export class NotificationsTableComponent extends TableComponent<Notification> implements OnInit, AfterViewInit {

	NotificationType = NotificationType;

  public readonly columns: string[] = [
    'select', 
    'title',
    'message', 
    'read',
  ];

  @ViewChild(MatSort, { static: false }) 
  public sort!: MatSort;

  @ViewChild(MatPaginator, { static: false }) 
  public paginator!: MatPaginator;

	@Input()
  public notifications!: Notification[];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { 
    super(notificationsService);
  }

  public ngOnInit(): void {
    this.rows.data = this.notifications;
    this.listenEvents();
  }

  private listenEvents(): void {
    this.notificationsService.events$.subscribe(({ 
      eventType, 
      payload 
    }: PusherEvent): void => {
      switch (eventType) {
        case PusherEventType.NOTIFICATION_CREATE_ONE: {
          this.addRow(payload);
          this.refreshRows();
          break;
        }
        case PusherEventType.NOTIFICATION_UPDATE_ONE: {
          this.editRow(payload);
          break;
        }
      }
    });
  }

  public ngAfterViewInit(): void {
    this.rows.paginator = this.paginator;
    this.rows.sort = this.sort;
  }

  public changeStatus(notification: Notification, status: boolean): void {

    const data = new NotificationAdapter().deserialize({ 
      ... notification, 
      read: status,
    });

    this.editResource(data).subscribe((): void => {
      this.snackBar.open(NOTIFICATION_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
    });
  }

  public delete(selectedRows: Notification[]): void {
    this.deleteResources(selectedRows).subscribe((): void => {
      this.snackBar.open(NOTIFICATION_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
    });
  }

  public view(selectedRow: Notification): void {
    this.dialog.open(NotificationDetailsComponent, {
    	data: selectedRow,
    });
  }

}