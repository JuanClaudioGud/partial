import { AppInjector } from '@app/injector';
import { ApiEndpoint } from '../types';
import { PusherService } from './pusher.service';
import { PusherEventType } from '../enums';
import { PusherEvent, Adapter, Resource } from '../interfaces';
import { ResourceService } from './resource.service';
import { Subject } from 'rxjs';

export abstract class ListenerService<T extends Resource> extends ResourceService<T> {

  private readonly pusherService: PusherService = AppInjector.instance.get(PusherService);

  public readonly events$: Subject<PusherEvent> = new Subject<PusherEvent>();

  constructor(
    resourceEndpoint: ApiEndpoint, 
    resourceAdapter: Adapter<T>, 
    events: PusherEventType[]
  ) {

    super(resourceEndpoint, resourceAdapter);

    events.forEach((eventType: PusherEventType): void => {
      this.pusherService.subscribe('events').bind(eventType, (data: PusherEvent): void => {
 
        const payload: T | T[] = Array.isArray(data.payload) 
        ? data.payload.map((item: any): T => resourceAdapter.deserialize(item)) 
        : resourceAdapter.deserialize(data.payload);

        this.events$.next({
          eventType,
          payload,
        });
      });
    });
  }

}