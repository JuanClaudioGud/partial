import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { TreatmentCategory } from '../models';
import { TreatmentCategoryAdapter } from '../adapters';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentCategoriesService extends ResourceService<TreatmentCategory> {
  constructor() { 
  	super(env.api.endpoints.treatmentCategories, new TreatmentCategoryAdapter());
  }
}
