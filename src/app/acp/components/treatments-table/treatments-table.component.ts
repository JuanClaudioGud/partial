import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Treatment, TreatmentCategory } from '@app/shared/models';
import { TreatmentAdapter } from '@app/shared/adapters';
import { TreatmentsService } from '@app/shared/services';
import { TableComponent } from '../table';
import { TreatmentDetailsComponent } from '../treatment-details';
import { AddTreatmentComponent } from '../add-treatment';
import { EditTreatmentComponent } from '../edit-treatment';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  TREATMENT_CREATE_SUCCESS_MSG,
  TREATMENT_UPDATE_SUCCESS_MSG, 
  TREATMENT_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-treatments-table',
  templateUrl: './treatments-table.component.html',
  styleUrls: ['./treatments-table.component.scss']
})
export class TreatmentsTableComponent extends TableComponent<Treatment> implements OnInit, AfterViewInit {

  public readonly columns: string[] = [
    'select', 
    'name', 
    'duration', 
    'price', 
    'category', 
    'status'
  ];

  public isSearching: boolean = false;

  @ViewChild(MatPaginator, { static: false })
   public paginator!: MatPaginator;

  @ViewChild(MatSort, { static: false })
   public sort!: MatSort;

  @Input() 
  public categories!: TreatmentCategory[];

	@Input() 
  public treatments!: Treatment[];

  constructor(
    treatmentService: TreatmentsService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(treatmentService);
  }

  public ngOnInit(): void {
    this.rows.data = Object.assign([], this.treatments);
    this.rows.filterPredicate = this.filterPredicate;
  }

  private filterPredicate(treatment: Treatment, filter: string): boolean {
    return JSON.stringify(treatment).toLowerCase().includes(filter);
  }

  public ngAfterViewInit(): void {
    this.rows.sort = this.sort;
    this.rows.paginator = this.paginator;
  }

  public search(value: string): void {
    if (typeof value === 'string') {
      this.rows.filter = value.trim().toLowerCase();
    }
  }

  public toggleState(treatment: Treatment): void {

    const data = new TreatmentAdapter().deserialize({ 
      ... treatment, 
      status: !treatment.status,
    });

    this.editResource(data).subscribe((): void => {
      this.snackBar.open(TREATMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
    });
  }

  public delete(selectedRows: Treatment[]): void  {
    this.deleteResources(selectedRows).subscribe((resources: Treatment[]): void => {
       this.snackBar.open(TREATMENT_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
       this.deleteTreatments(resources);
    });
  }

  public edit(selectedRow: Treatment): void {
    this.dialog
    .open(EditTreatmentComponent, {
      width: '350px',
      data: {
        treatment: new TreatmentAdapter().deserialize(selectedRow),
        categories: this.categories,
      },
    })
    .afterClosed()
    .subscribe((result: Treatment): void => {
      if (result) {
        this.editResource(result).subscribe((resource: Treatment): void => {
          this.snackBar.open(TREATMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editTreatment(resource);
        });
      }
    });
  }

  public add(): void {
    this.dialog
    .open(AddTreatmentComponent, {
      width: '350px',
      data: this.categories,
    })
    .afterClosed()
    .subscribe((result: Treatment): void => {
      if (result) {
        this.addResource(result).subscribe((resource: Treatment): void => {
          this.snackBar.open(TREATMENT_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.addTreatment(resource);
        });
      }
    });
  }

  public view(selectedRow: Treatment): void {
    this.dialog.open(TreatmentDetailsComponent, {
      width: '350px',
      data: selectedRow,
    });
  }

  private deleteTreatments(resources: Treatment[]): void {
    this.treatments = this.treatments.filter((treatment: Treatment): boolean => {
      return !resources.some((resource: Treatment): boolean => resource.id === treatment.id)
    });
  }

  private editTreatment(resource: Treatment): void {
    this.treatments = this.treatments.map((treatment: Treatment): Treatment => {
      return treatment.id === resource.id ? resource : treatment;
    });
  }

  private addTreatment(resource: Treatment): void {
    this.treatments.unshift(resource);
  }

}