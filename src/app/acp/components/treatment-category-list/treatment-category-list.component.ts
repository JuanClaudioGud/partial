import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TreatmentCategory } from '@app/shared/models';
import { TreatmentCategoryAdapter } from '@app/shared/adapters';
import { TreatmentCategoriesService } from '@app/shared/services';
import { ListComponent } from '../list';
import { TreatmentCategoryDetailsComponent } from '../treatment-category-details';
import { AddTreatmentCategoryComponent } from '../add-treatment-category';
import { EditTreatmentCategoryComponent } from '../edit-treatment-category';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  TREATMENT_CATEGORY_CREATE_SUCCESS_MSG,
  TREATMENT_CATEGORY_UPDATE_SUCCESS_MSG, 
  TREATMENT_CATEGORY_DELETE_SUCCESS_MSG 
} from '@app/constants';
@Component({
  selector: 'app-treatment-category-list',
  templateUrl: './treatment-category-list.component.html',
  styleUrls: ['./treatment-category-list.component.scss']
})
export class TreatmentCategoryListComponent extends ListComponent<TreatmentCategory> implements OnInit {

	@Input()
	public categories!: TreatmentCategory[];

  constructor(
    categoriesService: TreatmentCategoriesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(categoriesService);
  }

  public ngOnInit(): void {
  	this.items = Object.assign([], this.categories);
  }

  public toggleState(category: TreatmentCategory): void {

    const data = new TreatmentCategoryAdapter().deserialize({ 
      ... category, 
      status: !category.status,
    });

    this.editResource(data).subscribe(() => (
      this.snackBar.open(TREATMENT_CATEGORY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    ));
  }

  public delete(selectedItems: TreatmentCategory[]): void {
    this.deleteResources(selectedItems).subscribe((resources: TreatmentCategory[]): void => {
      this.snackBar.open(TREATMENT_CATEGORY_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteCategories(resources);
    });
  }

  public edit(selectedItem: TreatmentCategory): void {
    this.dialog
    .open(EditTreatmentCategoryComponent, {
      data: {
        category: new TreatmentCategoryAdapter().deserialize(selectedItem),
        categories: this.categories,
      },
    })
    .afterClosed()
    .subscribe((result: TreatmentCategory): void => {
      if (result) {
        this.editResource(result).subscribe((resource: TreatmentCategory) => {
          this.snackBar.open(TREATMENT_CATEGORY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editCategory(resource);
        });
      }
    });
  }

  public add(): void {
    this.dialog
    .open(AddTreatmentCategoryComponent, {
      data: this.categories,
    })
    .afterClosed()
    .subscribe((result: TreatmentCategory) => {
      if (result) {
        this.addResource(result).subscribe((resource: TreatmentCategory): void => {
          this.snackBar.open(TREATMENT_CATEGORY_CREATE_SUCCESS_MSG, 'Cerrar');
          this.addCategory(resource);
        });
      }
    });
  }

  public view(selectedItem: TreatmentCategory): void {
    this.dialog.open(TreatmentCategoryDetailsComponent, {
      data: selectedItem,
    });
  }

  private deleteCategories(resources: TreatmentCategory[]): void {
    this.categories = this.categories.filter((category: TreatmentCategory): boolean => {
      return !resources.some((resource: TreatmentCategory): boolean => resource.id === category.id)
    });
  }

  private editCategory(resource: TreatmentCategory): void {
    this.categories = this.categories.map((category: TreatmentCategory): TreatmentCategory => {
      return category.id === resource.id ? resource : category;
    });
  }

  private addCategory(resource: TreatmentCategory): void {
    this.categories.unshift(resource);
  }
  
}