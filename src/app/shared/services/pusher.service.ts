import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Channel } from 'pusher-js';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

	private readonly pusher: Pusher = new Pusher(env.pusher.key, { 
		cluster: env.pusher.cluster,
	});

  constructor() { }

  public subscribe(channel: string): Channel { 
  	return this.pusher.subscribe(channel);
  }

}
