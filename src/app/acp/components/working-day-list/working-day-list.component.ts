import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WorkingDay } from '@app/shared/models';
import { WorkingDayAdapter } from '@app/shared/adapters';
import { WorkingDaysService } from '@app/shared/services';
import { WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT } from '@app/constants';
import { ListComponent } from '../list';
import { EditWorkingDayComponent } from '../edit-working-day';

@Component({
  selector: 'app-working-day-list',
  templateUrl: './working-day-list.component.html',
  styleUrls: ['./working-day-list.component.scss']
})
export class WorkingDayListComponent extends ListComponent<WorkingDay> implements OnInit {

  @Input() 
  public workingDays!: WorkingDay[];

  constructor(
    workingDaysService: WorkingDaysService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { 
    super(workingDaysService);
  }

  public ngOnInit(): void {
    this.items = Object.assign([], this.workingDays);
  }

  public edit(selectedItem: WorkingDay): void {
    this.dialog.open(EditWorkingDayComponent, {
      data: new WorkingDayAdapter().deserialize(selectedItem),
    }).afterClosed().subscribe((result: WorkingDay): void => {
      if (result) {
        this.editResource(result).subscribe((): void => {
          this.snackBar.open(WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
        });
      }
    });
  }

}