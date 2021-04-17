import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WorkingDay } from '@app/shared/models';
import { WorkingDaysService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WorkingDaysResolver implements Resolve<Observable<WorkingDay[]>> {

	constructor(private readonly workingDaysService: WorkingDaysService) { }

	public resolve(): Observable<WorkingDay[]> {
		return this.workingDaysService.getAll();
	}

}