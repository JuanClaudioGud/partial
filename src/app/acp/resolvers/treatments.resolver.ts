import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Treatment } from '@app/shared/models';
import { TreatmentsService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TreatmentsResolver implements Resolve<Observable<Treatment[]>> {

	constructor(private readonly treatmentsService: TreatmentsService) { }

	public resolve(): Observable<Treatment[]> {
		return this.treatmentsService.getAll();
	}

}