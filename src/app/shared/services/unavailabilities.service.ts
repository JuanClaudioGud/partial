import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Unavailability } from '../models';
import { UnavailabilityAdapter } from '../adapters';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class UnavailabilitiesService extends ResourceService<Unavailability> {
  constructor() {
  	super(env.api.endpoints.unavailabilities, new UnavailabilityAdapter());
  }
}
