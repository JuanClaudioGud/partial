import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Appointment, Treatment } from '@app/shared/models';
import { AppointmentAdapter } from '@app/shared/adapters';
import { AppointmentStatus, PusherEventType } from '@app/shared/enums';
import { AppointmentsService } from '@app/shared/services';
import { PusherEvent } from '@app/shared/interfaces';
import { StatusPipe } from '@app/shared/pipes';
import { TableComponent } from '../table';
import { AppointmentDetailsComponent } from '../appointment-details';
import { AddAppointmentComponent } from '../add-appointment';
import { EditAppointmentComponent } from '../edit-appointment';
import { Subject } from 'rxjs';
import { indicate } from '@app/rxjs-operators';
import * as moment from 'moment';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  APPOINTMENT_CREATE_SUCCESS_MSG,
  APPOINTMENT_UPDATE_SUCCESS_MSG, 
  APPOINTMENT_DELETE_SUCCESS_MSG 
} from '@app/constants';

enum Tabs {
  ALL = 'Todo',
  PAST = 'Pasado',
  TODAY = 'Hoy',
  UPCOMING = 'Próximamente'
}

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./appointments-table.component.scss'],
})
export class AppointmentsTableComponent extends TableComponent<Appointment> implements OnInit, AfterViewInit {

  AppointmentStatus = AppointmentStatus;

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  public readonly tabs: string[] = ['Todo', 'Pasado', 'Hoy', 'Próximamente'];

  public readonly dateFormat: string = 'DD/MM/YYYY, h:mm A';

  public readonly columns: string[] = [
  	'select', 
  	'name', 
  	'email', 
  	'phone', 
  	'treatment', 
  	'date', 
  	'status',
  ];

  public currentTab: Tabs = Tabs.ALL;

	public isSearching: boolean = false;

  @ViewChild(MatSort, { static: false })
  public sort!: MatSort;

  @ViewChild(MatPaginator, { static: false })
 	public paginator!: MatPaginator;

 	@Input()
 	public treatments!: Treatment[];

 	@Input()
 	public appointments!: Appointment[];

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
    super(appointmentsService);
  }

  public ngOnInit(): void {
  	this.rows.data = Object.assign([], this.appointments);
  	this.rows.filterPredicate = this.filterPredicate.bind(this);
    this.listenEvents();
    this.watchLoading();
  }

  private watchLoading(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    );
  }

  public onTabChange(tab: Tabs): void {
    this.selection.clear();
    this.isSearching = false;
    this.searchTerm('');
    this.rows.data = this.filterByTab(tab);
  }

  private filterByTab(tab: Tabs): Appointment[] {
    return this.appointments.filter((appointment: Appointment): boolean => {
        switch (tab) {
          case Tabs.PAST: {
            return moment().isAfter(appointment.date, 'day');
            break;
          }
          case Tabs.TODAY: {
            return moment().isSame(appointment.date, 'day');
            break;
          }
          case Tabs.UPCOMING: {
            return moment().isBefore(appointment.date, 'day');
            break;
          }
          default: {
            return true;
            break;
          }
        }
      }
    );
  }

  private listenEvents(): void {
    this.appointmentsService.events$.subscribe(({ 
      eventType, 
      payload 
    }: PusherEvent): void => {
      switch (eventType) {
        case PusherEventType.APPOINTMENT_CREATE_ONE: {
          this.addAppointment(payload);
          this.onTabChange(this.currentTab);
          break;
        }
        case PusherEventType.APPOINTMENT_UPDATE_ONE: {
          this.editAppointment(payload);
          this.onTabChange(this.currentTab);
          break;
        }
      }
    });
  }

  private filterPredicate(appointment: Appointment, filter: string): boolean {
  	return this.stringify(appointment).toLowerCase().includes(filter);
  }

  private stringify(appointment: Appointment): string {
  	const date: string = appointment.date.format(this.dateFormat);
  	const status: string = new StatusPipe().transform(appointment.status);
  	return JSON.stringify({ ... appointment, date, status });
  }

  public ngAfterViewInit(): void {
    this.rows.paginator = this.paginator;
  	this.rows.sort = this.sort;
    this.rows.sortingDataAccessor = this.sortingDataAccessor;
  }

  private sortingDataAccessor(item: Appointment, property: string): any {
    return property == 'treatment' 
    ? (item as { [key: string]: any })[property].name 
    : (item as { [key: string]: any })[property];
  }

  public searchTerm(value: string): void {
    if (typeof value === 'string') {
      this.rows.filter = value.trim().toLowerCase();
    }
  }

  public changeStatus(appointment: Appointment, status: AppointmentStatus): void {
    this.appointmentsService.changeStatus(appointment, status).pipe(
      indicate(this.loading$)
    ).subscribe((resource: Appointment): void => {
      this.snackBar.open(APPOINTMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.editAppointment(resource);
      this.onTabChange(this.currentTab);
    });
  }

  public delete(selectedRows: Appointment[]): void  {
    this.deleteResources(selectedRows).subscribe((resources: Appointment[]): void => {
      this.snackBar.open(APPOINTMENT_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteAppointments(resources);
      this.onTabChange(this.currentTab);
    });
  }

  public edit(selectedRow: Appointment): void {
		this.dialog.open(EditAppointmentComponent, {
      width: '350px',
      data: {
      	appointment: new AppointmentAdapter().deserialize(selectedRow),
      	treatments: this.treatments,
      },
    }).afterClosed().subscribe((result: Appointment): void => {
      if (result) {
        this.editResource(result).subscribe((resource: Appointment): void => {
          this.snackBar.open(APPOINTMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editAppointment(resource);
          this.onTabChange(this.currentTab);
        });
      }
    });
  }

  public add(): void {
    this.dialog.open(AddAppointmentComponent, {
      width: '350px',
    	data: this.treatments,
    }).afterClosed().subscribe((result: Appointment): void => {
      if (result) this.addResource(result).subscribe((resource: Appointment): void => {
        this.snackBar.open(APPOINTMENT_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
        this.addAppointment(resource);
        this.onTabChange(this.currentTab);
      });
    });
  }

  public view(selectedRow: Appointment): void {
    this.dialog.open(AppointmentDetailsComponent, {
    	data: selectedRow,
    });
  }

  private deleteAppointments(resources: Appointment[]): void {
    this.appointments = this.appointments.filter((appointment: Appointment): boolean => {
      return !resources.some((resource: Appointment): boolean => resource.id === appointment.id)
    });
  }

  private editAppointment(resource: Appointment): void {
    this.appointments = this.appointments.map((appointment: Appointment): Appointment => {
      return appointment.id === resource.id ? resource : appointment;
    });
  }

  private addAppointment(resource: Appointment): void {
    this.appointments.unshift(resource);
  }

}