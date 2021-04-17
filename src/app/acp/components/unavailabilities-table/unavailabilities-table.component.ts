import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Unavailability } from '@app/shared/models';
import { UnavailabilityAdapter } from '@app/shared/adapters';
import { UnavailabilitiesService } from '@app/shared/services';
import { TableComponent } from '../table';
import { AddUnavailabilityComponent } from '../add-unavailability';
import { EditUnavailabilityComponent } from '../edit-unavailability';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  UNAVAILABILITY_CREATE_SUCCESS_MSG,
  UNAVAILABILITY_UPDATE_SUCCESS_MSG, 
  UNAVAILABILITY_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-unavailabilities-table',
  templateUrl: './unavailabilities-table.component.html',
  styleUrls: ['./unavailabilities-table.component.scss']
})
export class UnavailabilitiesTableComponent extends TableComponent<Unavailability> implements OnInit, AfterViewInit {

  public readonly columns: string[] = [
    'select', 
    'startDate', 
    'endDate', 
    'reason'
  ];

  @ViewChild(MatSort, { static: false }) 
  public sort!: MatSort;

  @ViewChild(MatPaginator, { static: false }) 
  public paginator!: MatPaginator;

	@Input()
	public unavailabilities!: Unavailability[];

  constructor(
    private unavailabilitiesService: UnavailabilitiesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { 
    super(unavailabilitiesService);
  }

  public ngOnInit(): void {
    this.rows.data = Object.assign([], this.unavailabilities);
  }

  public ngAfterViewInit(): void {
    this.rows.paginator = this.paginator;
    this.rows.sort = this.sort;
  }

  public delete(selectedRows: Unavailability[]): void {
    this.deleteResources(selectedRows).subscribe((resources: Unavailability[]): void => {
      this.snackBar.open(UNAVAILABILITY_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteUnavailabilities(resources);
    });
  }

  public edit(selectedRow: Unavailability): void {
    this.dialog.open(EditUnavailabilityComponent, {
      width: '350px',
      data: {
        unavailability: new UnavailabilityAdapter().deserialize(selectedRow),
        unavailabilities: this.unavailabilities,
      },
    }).afterClosed().subscribe((result: Unavailability): void => {
      if (result) {
        this.editResource(result).subscribe((resource: Unavailability): void => {
          this.snackBar.open(UNAVAILABILITY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editUnavailability(resource);
        });
      }
    });
  }

  public add(): void {
    this.dialog.open(AddUnavailabilityComponent, {
      width: '350px',
      data: this.unavailabilities,
    }).afterClosed().subscribe((result: Unavailability): void => {
      if (result) {
        this.addResource(result).subscribe((resource: Unavailability): void => {
          this.snackBar.open(UNAVAILABILITY_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.addUnavailability(resource);
        });
      }
    });
  }

  private deleteUnavailabilities(resources: Unavailability[]): void {
    this.unavailabilities = this.unavailabilities.filter((unavailability: Unavailability): boolean => {
      return !resources.some((resource: Unavailability): boolean => resource.id === unavailability.id)
    });
  }

  private editUnavailability(resource: Unavailability): void {
    this.unavailabilities = this.unavailabilities.map((unavailability: Unavailability): Unavailability => {
      return unavailability.id === resource.id ? resource : unavailability;
    });
  }

  private addUnavailability(resource: Unavailability): void {
    this.unavailabilities.unshift(resource);
  }

}