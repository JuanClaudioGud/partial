import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BreakTime } from '@app/shared/models';
import { BreakTimesService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BreakTimesResolver implements Resolve<Observable<BreakTime[]>> {

	constructor(private readonly breakTimesService: BreakTimesService) { }

	public resolve(): Observable<BreakTime[]> {
		return this.breakTimesService.getAll();
	}

}