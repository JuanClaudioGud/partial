import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from '../../models';
import { NotificationType } from '../../enums';
import { AppointmentDetailsComponent } from '../appointment-details';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent {

	NotificationType = NotificationType;

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
    public readonly notification: Notification,
    private readonly dialog: MatDialog
  ) { }

	public onClick(): void {
		this.dialog.open(AppointmentDetailsComponent, {
			data: this.notification.payload,
		});
	}

}
