import { HttpClient } from '@angular/common/http';
import { AppInjector } from '@app/injector';
import { ApiEndpoint } from '../types';
import { Adapter, Resource } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class ResourceService<T extends Resource> {

	protected readonly http: HttpClient = AppInjector.instance.get(HttpClient);

  constructor(
  	protected readonly resourceEndpoint: ApiEndpoint,
  	protected readonly resourceAdapter: Adapter<T>,
  ) { }

  public getAll(): Observable<T[]> {
    return this.http.get(this.resourceEndpoint).pipe(
      map((resources: any): T[] => {
        return resources.map((resource: any): T => {
          return this.resourceAdapter.deserialize(resource);
        });
      })
    );
  }

  public createOne(resource: T): Observable<T> {
    return this.http.post(
      this.resourceEndpoint, 
      this.resourceAdapter.serialize(resource)
    ).pipe(
      map((resource: any): T => {
        return this.resourceAdapter.deserialize(resource);
      })
    );
  }

  public updateOne(resource: T): Observable<T> {

    const endpoint: string = `${ this.resourceEndpoint }/${ resource.id }`;

    return this.http.patch(
      endpoint, 
      this.resourceAdapter.serialize(resource)
    ).pipe(
      map((resource: any): T => {
        return this.resourceAdapter.deserialize(resource);
      })
    );
  }

  public deleteMany(resources: T[]): Observable<T[]> {
    return this.http.request('DELETE', this.resourceEndpoint, { 
      body: {
        ids: this.extractIds(resources),
      },
    }).pipe(
      map((resources: any): T[] => {
        return resources.map((resource: any): T => {
          return this.resourceAdapter.deserialize(resource);
        })
      }),
    );
  }

  private extractIds(resources: T[]): (number | undefined)[] {
    return resources.map((resource: T) => resource.id);
  }

}