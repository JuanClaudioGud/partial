import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NotificationsService } from '../services';
import { Notification } from '../models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NotificationsResolver implements Resolve<Observable<Notification[]>> {

	constructor(private readonly notificationsService: NotificationsService) { }

	public resolve(): Observable<Notification[]> {
		return this.notificationsService.getAll();
	}

}