import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TreatmentCategory } from '@app/shared/models';
import { TreatmentCategoriesService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TreatmentCategoriesResolver implements Resolve<Observable<TreatmentCategory[]>> {

	constructor(private readonly treatmentCategoriesService: TreatmentCategoriesService) { }

	public resolve(): Observable<TreatmentCategory[]> {
		return this.treatmentCategoriesService.getAll();
	}

}