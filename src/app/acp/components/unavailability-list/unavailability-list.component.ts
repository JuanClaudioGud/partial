import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { Unavailability } from '@app/shared/models';
import { UnavailabilityAdapter } from '@app/shared/adapters';
import { UnavailabilitiesService } from '@app/shared/services';
import { ListComponent } from '../list';
import { AddUnavailabilityComponent } from '../add-unavailability';
import { EditUnavailabilityComponent } from '../edit-unavailability';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  UNAVAILABILITY_CREATE_SUCCESS_MSG,
  UNAVAILABILITY_UPDATE_SUCCESS_MSG, 
  UNAVAILABILITY_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-unavailability-list',
  templateUrl: './unavailability-list.component.html',
  styleUrls: ['./unavailability-list.component.scss']
})
export class UnavailabilityListComponent extends ListComponent<Unavailability> implements OnInit, AfterViewInit {

  @ViewChild(MatSelectionList, { static: true }) 
  public selectionList!: MatSelectionList;

	@Input()
	public unavailabilities!: Unavailability[];

  constructor(
    unavailabilitiesService: UnavailabilitiesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { 
    super(unavailabilitiesService);
  }

  public ngOnInit(): void {
  	this.items = Object.assign([], this.unavailabilities);
  }

  public ngAfterViewInit(): void {
    this.selection = this.selectionList.selectedOptions;
  }

  public get selectedValue(): Unavailability {
    return this.selection.selected[0].value;
  }

  public get selectedValues(): Unavailability[] {

    const selection: MatListOption[] = this.selection.selected;
    
    return selection.map((option: MatListOption) => option.value);
  }

  public delete(selectedItems: Unavailability[]): void {
    this.deleteResources(selectedItems).subscribe((resources: Unavailability[]): void => {
      this.snackBar.open(UNAVAILABILITY_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteUnavailabilities(resources);
    });
  }

  public edit(selectedItem: Unavailability): void {
    this.dialog.open(EditUnavailabilityComponent, {
      data: {
        unavailability: new UnavailabilityAdapter().deserialize(selectedItem),
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