import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AppInjector } from '@app/injector';
import { Resource } from '@app/shared/interfaces';
import { ResourceService, LoadingService } from '@app/shared/services';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

export abstract class ListComponent<T extends Resource> {

  protected readonly loadingService: LoadingService = AppInjector.instance.get(LoadingService);

	public selection: SelectionModel<any> = new SelectionModel<T>(true, []);

  public items: T[] = [];

  constructor(private resourceService: ResourceService<T>) { }

  public get isAllSelected(): boolean {
    return this.selection.selected.length === this.items.length;
  }
  
  public masterToggle(): void {
    this.isAllSelected 
    ? this.selection.clear() 
    : this.items.forEach((item: T): void => {
      this.selection.select(item)
    });
  }

  protected addItem(resource: T): void {
    this.items.unshift(resource);
  }

  protected editItem(resource: T): void {
    this.items = this.items.map((item: T): T => {
      return item.id === resource.id ? resource : item;
    });
  }

  protected deleteItems(resources: T[]): void {
  	this.items = this.items.filter((item: T): boolean => {
  		return !resources.some((resource: T): boolean => resource.id === item.id)
    });
  }

  protected addResource(resource: T): Observable<T> {
    this.loadingService.start();
    return this.resourceService.createOne(resource).pipe(
      finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resource: T): void => this.addItem(resource)),
    );
  }

  protected editResource(resource: T): Observable<T> {
    this.loadingService.start();
    return this.resourceService.updateOne(resource).pipe(
      finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resource: T): void => this.editItem(resource)),
    );
  }

  protected deleteResources(resources: T[]): Observable<T[]> {
    this.loadingService.start();
    return this.resourceService.deleteMany(resources).pipe(
      finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resources: T[]): void => this.deleteItems(resources)),
    );
  }

}