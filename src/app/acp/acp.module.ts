import * as moment from 'moment-timezone';
import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AcpRoutingModule, AcpRoutingComponents } from './acp.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { SidenavToggleDirective } from './directives';
import { 
  ToolbarComponent,
  SearchbarComponent,
  SelectionbarComponent,
  EventComponent,
  NotificationsIconComponent,
  NotificationDetailsComponent,
  NotificationsTableComponent,
  NotificationListComponent,
  AppointmentDetailsComponent,
  AppointmentActionSheetComponent,
  AppointmentsTableComponent,
  AppointmentListComponent,
  AddAppointmentComponent,
  EditAppointmentComponent,
  ChangeAppointmentStatusComponent,
  TreatmentsTableComponent,
  TreatmentListComponent,
  TreatmentDetailsComponent,
  AddTreatmentComponent,
  EditTreatmentComponent,
  TreatmentCategoriesTableComponent,
  TreatmentCategoryListComponent,
  TreatmentCategoryDetailsComponent,
  AddTreatmentCategoryComponent,
  EditTreatmentCategoryComponent,
  WorkingDaysTableComponent,
  WorkingDayListComponent,
  EditWorkingDayComponent,
  BreakTimesTableComponent,
  BreakTimeListComponent,
  AddBreakTimeComponent,
  EditBreakTimeComponent,
  UnavailabilitiesTableComponent,
  UnavailabilityListComponent,
  AddUnavailabilityComponent,
  EditUnavailabilityComponent
} from './components';

const ACP_COMPONENTS: Type<any>[] = [
  ToolbarComponent,
  SearchbarComponent,
  SelectionbarComponent,
  EventComponent,
  NotificationsIconComponent,
  NotificationDetailsComponent,
  NotificationsTableComponent,
  NotificationListComponent,
  AppointmentDetailsComponent,
  AppointmentActionSheetComponent,
  AppointmentsTableComponent,
  AppointmentListComponent,
  AddAppointmentComponent,
  EditAppointmentComponent,
  ChangeAppointmentStatusComponent,
  TreatmentsTableComponent,
  TreatmentListComponent,
  TreatmentDetailsComponent,
  AddTreatmentComponent,
  EditTreatmentComponent,
  TreatmentCategoriesTableComponent,
  TreatmentCategoryListComponent,
  TreatmentCategoryDetailsComponent,
  AddTreatmentCategoryComponent,
  EditTreatmentCategoryComponent,
  WorkingDaysTableComponent,
  WorkingDayListComponent,
  EditWorkingDayComponent,
  BreakTimesTableComponent,
  BreakTimeListComponent,
  AddBreakTimeComponent,
  EditBreakTimeComponent,
  UnavailabilitiesTableComponent,
  UnavailabilityListComponent,
  AddUnavailabilityComponent,
  EditUnavailabilityComponent,
];

const ACP_DIRECTIVES: Type<any>[] = [
	SidenavToggleDirective,
];

@NgModule({
	declarations: [
		... AcpRoutingComponents,
		... ACP_COMPONENTS,
		... ACP_DIRECTIVES,
	],
  imports: [
    SharedModule,
    AcpRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: () => adapterFactory(moment),
    }),
  ],
})
export class AcpModule { }