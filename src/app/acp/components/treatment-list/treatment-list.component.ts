import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Treatment, TreatmentCategory } from '@app/shared/models';
import { TreatmentAdapter } from '@app/shared/adapters';
import { TreatmentsService } from '@app/shared/services';
import { ListComponent } from '../list';
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
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.scss']
})
export class TreatmentListComponent extends ListComponent<Treatment> implements OnInit {

  @Input() 
  public categories!: TreatmentCategory[];

	@Input() 
  public treatments!: Treatment[];

	public isSearching: boolean = false;

  constructor(
  	treatmentsService: TreatmentsService,
  	private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
  	super(treatmentsService);
  }

  public ngOnInit(): void {
  	this.items = Object.assign([], this.treatments);
  }

  public search(value: string): void {
    if (typeof value == 'string') {
      const filter: string = value.trim().toLowerCase();
      this.items = this.treatments.filter((treatment: Treatment): boolean => {
        return JSON.stringify(treatment).toLowerCase().includes(filter);
      });
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

  public delete(selectedItems: Treatment[]): void  {
    this.deleteResources(selectedItems).subscribe((resources: Treatment[]): void => {
      this.snackBar.open(TREATMENT_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteTreatments(resources);
    });
  }

  public edit(selectedItem: Treatment): void {
    this.dialog
    .open(EditTreatmentComponent, {
      data: {
        treatment: new TreatmentAdapter().deserialize(selectedItem),
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

  public view(selectedItem: Treatment): void {
    this.dialog.open(TreatmentDetailsComponent, {
      data: selectedItem,
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