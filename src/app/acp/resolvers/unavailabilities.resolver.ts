import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Unavailability } from '@app/shared/models';
import { UnavailabilitiesService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UnavailabilitiesResolver implements Resolve<Observable<Unavailability[]>> {

	constructor(private readonly unavailabilitiesService: UnavailabilitiesService) { }

	public resolve(): Observable<Unavailability[]> {
		return this.unavailabilitiesService.getAll();
	}

}