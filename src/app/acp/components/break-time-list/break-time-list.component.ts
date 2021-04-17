import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { BreakTime, WorkingDay } from '@app/shared/models';
import { BreakTimeAdapter } from '@app/shared/adapters';
import { BreakTimesService } from '@app/shared/services';
import { ListComponent } from '../list';
import { AddBreakTimeComponent } from '../add-break-time';
import { EditBreakTimeComponent } from '../edit-break-time';
import { BehaviorSubject } from 'rxjs';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  BREAK_TIME_CREATE_SUCCESS_MSG,
  BREAK_TIME_UPDATE_SUCCESS_MSG, 
  BREAK_TIME_DELETE_SUCCESS_MSG 
} from '@app/constants';

@Component({
  selector: 'app-break-time-list',
  templateUrl: './break-time-list.component.html',
  styleUrls: ['./break-time-list.component.scss'],
})
export class BreakTimeListComponent extends ListComponent<BreakTime> implements OnInit, AfterViewInit {
 
  public currentIndex!: number;

  public indexChange$!: BehaviorSubject<number>;

  @ViewChild(MatSelectionList, { static: true }) 
  public selectionList!: MatSelectionList;

  @Input() 
  public workingDays!: WorkingDay[];

  @Input()
  public breakTimes!: BreakTime[];

  constructor(
    breakTimesService: BreakTimesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { 
    super(breakTimesService);
  }

  public ngOnInit(): void {
    this.items = this.breakTimes;
    this.indexChange$ = new BehaviorSubject<number>(this.initialIndex);
    this.indexChange$.subscribe((index: number) => {
      this.currentIndex = index;
      this.items = this.filterByIndex(index);
    });
  }

  public ngAfterViewInit(): void {
    this.selection = this.selectionList.selectedOptions;
  }

  private get initialIndex(): number {
    return this.workingDays.findIndex((workingDay: WorkingDay): boolean => (
      workingDay.status === true
    ));
  }

  private filterByIndex(index: number): BreakTime[] {
    return this.breakTimes.filter((breakTime: BreakTime): boolean => (
      index === breakTime.workingDay.weekDayId
    ));
  }

  public get selectedValue(): BreakTime {
    return this.selection.selected[0].value;
  }

  public get selectedValues(): BreakTime[] {

    const selection: MatListOption[] = this.selection.selected;

    return selection.map((option: MatListOption) => option.value);
  }
  
  public delete(selectedItems: BreakTime[]): void {
    this.deleteResources(selectedItems).subscribe((resources: BreakTime[]): void => {
       this.snackBar.open(BREAK_TIME_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
       this.deleteBreakTimes(resources);
       this.refreshIndex();
    });
  }

  public edit(selectedItem: BreakTime): void {
    this.dialog.open(EditBreakTimeComponent, {
      data: {
        breakTime: new BreakTimeAdapter().deserialize(selectedItem),
        breakTimes: this.breakTimes,
        workingDays: this.workingDays,
      },
    }).afterClosed().subscribe((result: BreakTime): void => {
      if (result) {
        this.editResource(result).subscribe((resource: BreakTime): void => {
          this.snackBar.open(BREAK_TIME_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editBreakTime(resource);
          this.refreshIndex();
        });
      }
    });
  }

  public add(): void {
    this.dialog.open(AddBreakTimeComponent, {
      data: {
        breakTimes: this.breakTimes,
        workingDays: this.workingDays,
      },
    }).afterClosed().subscribe((result: BreakTime): void => {
      if (result) {
        this.addResource(result).subscribe((resource: BreakTime): void => {
          this.snackBar.open(BREAK_TIME_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.addBreakTime(resource);
          this.refreshIndex();
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

  private refreshIndex(): void {
    this.indexChange$.next(this.currentIndex);
  }
  
}