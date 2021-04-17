import { Type, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	NotificationsResolver,
	AppointmentsResolver,
	TreatmentsResolver,
	TreatmentCategoriesResolver,
	WorkingDaysResolver,
	BreakTimesResolver,
	UnavailabilitiesResolver
} from './resolvers';
import { 
  AcpLayoutComponent, 
  NotificationsComponent,
  CalendarComponent,
  AppointmentsComponent,
  TreatmentsComponent,
  TreatmentCategoriesComponent,
  WorkingDaysComponent,
  BreakTimesComponent,
  UnavailabilitiesComponent
} from './components';

const ACP_ROUTES: Routes = [
	{
		path: '', 
		component: AcpLayoutComponent,
		children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendar',
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        resolve: {
          notifications: NotificationsResolver,
        },
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        resolve: {
          appointments: AppointmentsResolver,
          treatments: TreatmentsResolver,
        },
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        resolve: {
          appointments: AppointmentsResolver,
          treatments: TreatmentsResolver,
        },
      },
      {
        path: 'treatments',
        component: TreatmentsComponent,
        resolve: {
          treatments: TreatmentsResolver,
          treatmentCategories: TreatmentCategoriesResolver,
        },
      },
      {
        path: 'categories',
        component: TreatmentCategoriesComponent,
        resolve: {
          treatmentCategories: TreatmentCategoriesResolver,
        },
      },
      {
        path: 'working-days',
        component: WorkingDaysComponent,
        resolve: {
          workingDays: WorkingDaysResolver,
        },
      },
      {
        path: 'break',
        component: BreakTimesComponent,
        resolve: {
          breakTimes: BreakTimesResolver,
          workingDays: WorkingDaysResolver,
        },
      },
      {
        path: 'unavailabilities',
        component: UnavailabilitiesComponent,
        resolve: {
          unavailabilities: UnavailabilitiesResolver,
        },
      },
    ],
	},
];

export const AcpRoutingModule: ModuleWithProviders<RouterModule> = (
	RouterModule.forChild(ACP_ROUTES)
);

export const AcpRoutingComponents: Type<any>[] = [
  AcpLayoutComponent,
  NotificationsComponent,
  CalendarComponent,
  AppointmentsComponent,
  TreatmentsComponent,
  TreatmentCategoriesComponent,
  WorkingDaysComponent,
  BreakTimesComponent,
  UnavailabilitiesComponent,
];