import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Treatment } from '../models';
import { TreatmentAdapter } from '../adapters';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService extends ResourceService<Treatment> {
  constructor() { 
  	super(env.api.endpoints.treatments, new TreatmentAdapter());
  }
}