import { NgModule, Type } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule, HomeRoutingComponents } from './home.routing';
import { BookingTriggerDirective, CheckStatusTriggerDirective } from './directives';
import { 
  BookingComponent, 
  CheckStatusComponent, 
  AppointmentStatusComponent, 
  FooterComponent,
} from './components';

const HOME_DIRECTIVES: Type<any>[] = [
  BookingTriggerDirective, 
  CheckStatusTriggerDirective,
];

const HOME_COMPONENTS: Type<any>[] = [
  BookingComponent,
  CheckStatusComponent,
  AppointmentStatusComponent,
  FooterComponent,
];

@NgModule({
	declarations: [
		... HomeRoutingComponents,
    ... HOME_COMPONENTS,
    ... HOME_DIRECTIVES,
	],
  imports: [
    SharedModule,
   	HomeRoutingModule,
    GoogleMapsModule,
  ],
})
export class HomeModule { }