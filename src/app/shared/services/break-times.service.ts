import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { BreakTime } from '../models';
import { BreakTimeAdapter } from '../adapters';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class BreakTimesService extends ResourceService<BreakTime> {
  constructor() { 
  	super(env.api.endpoints.breakTimes, new BreakTimeAdapter());
  }
}
