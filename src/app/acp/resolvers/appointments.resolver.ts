import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Appointment } from '@app/shared/models';
import { AppointmentsService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AppointmentsResolver implements Resolve<Observable<Appointment[]>> {

	constructor(private readonly appointmentsService: AppointmentsService) { }

	public resolve(): Observable<Appointment[]> {
		return this.appointmentsService.getAll();
	}

}