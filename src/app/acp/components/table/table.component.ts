import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AppInjector } from '@app/injector';
import { Resource } from '@app/shared/interfaces';
import { ResourceService, LoadingService } from '@app/shared/services';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

export abstract class TableComponent<T extends Resource> {

  protected readonly loadingService: LoadingService = AppInjector.instance.get(LoadingService);

	public readonly selection: SelectionModel<T> = new SelectionModel<T>(true, []);

  public readonly rows: MatTableDataSource<T> = new MatTableDataSource<T>([]);

  constructor(protected resourceService: ResourceService<T>) { }

  public get isAllSelected(): boolean {
    return this.selection.selected.length === this.rows.data.length;
  }
  
  public masterToggle(): void {
    this.isAllSelected 
    ? this.selection.clear() 
    : this.rows.data.forEach((row: T): void => {
      this.selection.select(row)
    });
  }

  protected addRow(resource: T): void {
    this.rows.data.unshift(resource);
  }

  protected editRow(resource: T): void {
    this.rows.data = this.rows.data.map((row: T): T => {
      return row.id === resource.id ? resource : row;
    });
  }

  protected deleteRows(resources: T[]): void {
    this.rows.data = this.rows.data.filter((row: T): boolean => {
      return !resources.some((resource: T): boolean => resource.id === row.id);
    });
  }

  protected addResource(resource: T): Observable<T> {
    this.loadingService.start();
    return this.resourceService.createOne(resource).pipe(
    	finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resource: T): void => {
        this.addRow(resource);
        this.refreshRows();
      }),
    );
  }

  protected editResource(resource: T): Observable<T> {
    this.loadingService.start();
    return this.resourceService.updateOne(resource).pipe(
      finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resource: T): void => {
        this.editRow(resource);
      }),
    );
  }

  protected deleteResources(resources: T[]): Observable<T[]> {
    this.loadingService.start();
    return this.resourceService.deleteMany(resources).pipe(
      finalize((): void => {
        this.selection.clear();
        this.loadingService.stop();
      }),
      tap((resources: T[]): void => {
        this.deleteRows(resources);
        this.refreshRows();
      }),
    );
  }

  protected refreshRows(): void {
  	this.rows.data = this.rows.data;
  }

}