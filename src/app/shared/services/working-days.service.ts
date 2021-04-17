import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { WorkingDay } from '../models';
import { WorkingDayAdapter } from '../adapters';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class WorkingDaysService extends ResourceService<WorkingDay> {
  constructor() { 
  	super(env.api.endpoints.workingDays, new WorkingDayAdapter());
  }
}
