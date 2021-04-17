import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WorkingDay } from '@app/shared/models';
import { WorkingDayAdapter } from '@app/shared/adapters';
import { WorkingDaysService } from '@app/shared/services';
import { WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT, TIMEZONE } from '@app/constants';
import { TableComponent } from '../table';
import { extendMoment, DateRange } from 'moment-range';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

const momentRange = extendMoment(moment);

@Component({
  selector: 'app-working-days-table',
  templateUrl: './working-days-table.component.html',
  styleUrls: ['./working-days-table.component.scss']
})
export class WorkingDaysTableComponent extends TableComponent<WorkingDay> implements OnInit {

  public readonly columns: string[] = [
    'day', 
    'openingHour', 
    'closingHour', 
    'status'
  ];

  public dayTimes!: Moment[];

  @Input() 
  public workingDays!: WorkingDay[];

  constructor(
    workingDaysService: WorkingDaysService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(workingDaysService);
  }

  public ngOnInit(): void {
    this.rows.data = Object.assign([], this.workingDays);
    this.dayTimes = this.getDayTimes(15);
  }

  private getDayTimes(steps: number): Moment[] {
    const startOfDay: Moment = moment().tz(TIMEZONE).startOf('day');
    const endOfDay: Moment = moment().tz(TIMEZONE).endOf('day');
    const range: DateRange = momentRange.range(startOfDay, endOfDay);
    return Array.from(range.by('minutes', { step: steps }));
  }

  public compareFn(o1: Moment, o2: Moment): boolean {
    return o1.isSame(o2);
  }

  public toggleState(workingDay: WorkingDay): void {

    const data = new WorkingDayAdapter().deserialize({ 
      ... workingDay, 
      status: !workingDay.status,
    });

    this.editResource(data).subscribe(() => {
      this.snackBar.open(WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    });
  }

  public changeOpeningHour(workingDay: WorkingDay, openingHour: Moment): void {

    const data = new WorkingDayAdapter().deserialize({ 
      ... workingDay, 
      openingHour,
    });

    this.editResource(data).subscribe((): void => {
      this.snackBar.open(WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    });
  }

  public changeClosingHour(workingDay: WorkingDay, closingHour: Moment): void {

    const data = new WorkingDayAdapter().deserialize({ 
      ... workingDay, 
      closingHour,
    });

    this.editResource(data).subscribe((): void =>  {
      this.snackBar.open(WORKING_DAY_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    });
  }

}