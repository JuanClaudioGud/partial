import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Appointment, Treatment } from '@app/shared/models';
import { AppointmentStatus, PusherEventType } from '@app/shared/enums';
import { AppointmentsService } from '@app/shared/services';
import { AppointmentAdapter } from '@app/shared/adapters';
import { PusherEvent } from '@app/shared/interfaces';
import { StatusPipe } from '@app/shared/pipes';
import { ListComponent } from '../list';
import { AppointmentActionSheetComponent } from '../appointment-action-sheet';
import { AppointmentDetailsComponent } from '../appointment-details';
import { AddAppointmentComponent } from '../add-appointment';
import { EditAppointmentComponent } from '../edit-appointment';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { indicate } from '@app/rxjs-operators';
import * as moment from 'moment';
import { 
  SNACK_BAR_DEFAULT_DISMISS_TEXT,
  APPOINTMENT_CREATE_SUCCESS_MSG,
  APPOINTMENT_UPDATE_SUCCESS_MSG, 
  APPOINTMENT_DELETE_SUCCESS_MSG 
} from '@app/constants';

enum Tabs {
	PAST,
	TODAY,
	UPCOMING
}

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent extends ListComponent<Appointment> implements OnInit {

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  public readonly search$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly tabChange$: BehaviorSubject<Tabs> = new BehaviorSubject<Tabs>(Tabs.TODAY);

  public readonly tabs: string[] = ['Pasado', 'Hoy', 'Próximamente'];

  public currentTab!: Tabs;

  public isSearching: boolean = false;

  public dateFormat?: string;

  @Input()
  public treatments!: Treatment[];

  @Input()
  public appointments!: Appointment[];

  constructor(
    private readonly appointmentsService: AppointmentsService,
  	private readonly bottomSheet: MatBottomSheet,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { 
  	super(appointmentsService);
  }

  public ngOnInit(): void { 
    this.items = this.appointments;
    this.listenEvents();
    this.listenChanges();
    this.watchLoading();
  }

  private watchLoading(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
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
          this.refreshTab();
          break;
        }
        case PusherEventType.APPOINTMENT_UPDATE_ONE: {
          this.editAppointment(payload);
          this.refreshTab();
          break;
        }
      }
    });
  }

  private listenChanges(): void {
    combineLatest(
      this.tabChange$,
      this.search$
    ).subscribe(([tab, isSearching]: [Tabs, boolean]): void => {
      this.selection.clear();
      this.isSearching = isSearching;
      this.currentTab = tab;
      this.dateFormat = tab !== Tabs.TODAY || isSearching ? 'DD/MM/YYYY, h:mm A' : 'HH:mm A';
      this.items = isSearching ? this.appointments : this.filterByTab(tab);
    });
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
        }
      }
    );
  }

  public searchTerm(value: string): void {
    if (typeof value == 'string') {
      const filter: string = value.trim().toLowerCase();
      this.items = this.appointments.filter((appointment: Appointment): boolean => (
        this.stringify(appointment).toLowerCase().includes(value)
      ));
    }
  }

  private stringify(appointment: Appointment): string {
    const date: string = appointment.date.format(this.dateFormat);
    const status: string = new StatusPipe().transform(appointment.status);
    return JSON.stringify({ ... appointment, date, status });
  }

  public openActionSheet(appointment: Appointment): void {
    this.bottomSheet.open(AppointmentActionSheetComponent, {
      data: appointment
    }).afterDismissed().subscribe((status: AppointmentStatus): void => {
      if (status) this.changeStatus(appointment, status);
    });
  }

  public changeStatus(appointment: Appointment, status: AppointmentStatus): void {
    this.appointmentsService.changeStatus(appointment, status).pipe(
      indicate(this.loading$)
    ).subscribe((resource: Appointment): void => {
      this.snackBar.open(APPOINTMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.editAppointment(resource);
      this.refreshTab();
    });
  }

  public delete(selectedItems: Appointment[]): void  {
    this.deleteResources(selectedItems).subscribe((resources: Appointment[]): void => {
      this.snackBar.open(APPOINTMENT_DELETE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      this.deleteAppointments(resources);
      this.refreshTab();
    });
  }

  public edit(selectedItem: Appointment): void {
    this.dialog.open(EditAppointmentComponent, {
      data: {
        appointment: new AppointmentAdapter().deserialize(selectedItem),
        treatments: this.treatments,
      },
    }).afterClosed().subscribe((result: Appointment): void => {
      if (result) {
        this.editResource(result).subscribe((resource: Appointment): void => {
          this.snackBar.open(APPOINTMENT_UPDATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
          this.editAppointment(resource);
          this.refreshTab();
        });
      }
    });
  }

  public add(): void {
    this.dialog.open(AddAppointmentComponent, {
      data: this.treatments,
    }).afterClosed().subscribe((result: Appointment): void => {
      if (result) this.addResource(result).subscribe((resource: Appointment): void => {
        this.snackBar.open(APPOINTMENT_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
        this.addAppointment(resource);
        this.refreshTab();
      });
    });
  }

  public view(selectedItem: Appointment): void {
    this.dialog.open(AppointmentDetailsComponent, {
      data: selectedItem,
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

  private refreshTab(): void {
    this.tabChange$.next(this.currentTab);
  }

}