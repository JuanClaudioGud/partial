import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakTime, WorkingDay } from '@app/shared/models';
import { BreakTimeAdapter } from '@app/shared/adapters';
import { BreakTimesService } from '@app/shared/services';
import { TableComponent } from '../table';
import { AddBreakTimeComponent } from '../add-break-time';
import { EditBreakTimeComponent } from '../edit-break-time';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  BREAK_TIME_CREATE_SUCCESS_MSG,
  BREAK_TIME_UPDATE_SUCCESS_MSG, 
  BREAK_TIME_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-break-times-table',
  templateUrl: './break-times-table.component.html',
  styleUrls: ['./break-times-table.component.scss']
})
export class BreakTimesTableComponent extends TableComponent<BreakTime> implements OnInit, AfterViewInit {

  public readonly columns: string[] = [
    'select', 
    'workingDay', 
    'startTime', 
    'endTime', 
    'reason'
  ];

  @ViewChild(MatSort, { static: true }) 
  public sort!: MatSort;

  @ViewChild(MatPaginator, { static: true }) 
  public paginator!: MatPaginator;

	@Input() 
	public workingDays!: WorkingDay[];

  @Input()
  public breakTimes!: BreakTime[];

  constructor(
    breakTimesService: BreakTimesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(breakTimesService);
  }

  public ngOnInit(): void {
    this.rows.data = this.breakTimes;
  }

  public ngAfterViewInit(): void {
    this.rows.paginator = this.paginator;
    this.rows.sort = this.sort;
    this.rows.sortingDataAccessor = this.sortingDataAccessor;
  }

  private sortingDataAccessor(item: BreakTime, property: string): any {
    return property == 'workingDay' 
    ? (item as { [key: string]: any })[property].weekDayId 
    : (item as { [key: string]: any })[property];
  }

  public delete(selectedRows: BreakTime[]): void {
    this.deleteResources(selectedRows).subscribe((resources: BreakTime[]): void => {
      this.snackBar.open(BREAK_TIME_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteBreakTimes(resources);
    });
  }

  public edit(selectedRow: BreakTime): void {
    this.dialog
    .open(EditBreakTimeComponent, {
      width: '350px',
      data: {
        breakTime: new BreakTimeAdapter().deserialize(selectedRow),
        breakTimes: this.breakTimes,
        workingDays: this.workingDays,
      },
    })
    .afterClosed()
    .subscribe((result: BreakTime): void => {
      if (result) {
        this.editResource(result).subscribe((resource: BreakTime): void => {
          this.snackBar.open(BREAK_TIME_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editBreakTime(resource);
        });
      }
    });
  }

  public add(): void {
    this.dialog
    .open(AddBreakTimeComponent, {
      width: '350px',
      data: {
        breakTimes: this.breakTimes,
        workingDays: this.workingDays,        
      },
    })
    .afterClosed()
    .subscribe((result: BreakTime): void => {
      if (result) {
        this.addResource(result).subscribe((resource: BreakTime): void => {
          this.snackBar.open(BREAK_TIME_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.addBreakTime(resource);
        });
      }
    });
  }

  private deleteBreakTimes(resources: BreakTime[]): void {
    this.breakTimes = this.breakTimes.filter((breakTime: BreakTime): boolean => {
      return !resources.some((resource: BreakTime): boolean => resource.id === breakTime.id)
    });
  }

  private editBreakTime(resource: BreakTime): void {
    this.breakTimes = this.breakTimes.map((breakTime: BreakTime): BreakTime => {
      return breakTime.id === resource.id ? resource : breakTime;
    });
  }

  private addBreakTime(resource: BreakTime): void {
    this.breakTimes.unshift(resource);
  }

}