import { NgModule, Optional, SkipSelf, ErrorHandler, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrefixInterceptor, JwtInterceptor, ErrorInterceptor } from './interceptors';
import { ErrorHandlerService } from './services';
import { throwIfAlreadyLoaded } from '@app/shared/guards';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import * as moment from 'moment-timezone';

@NgModule({
  providers: [
    { 
      provide: LOCALE_ID, 
      useValue: 'es-AR',
    },
    { 
      provide: ErrorHandler, 
      useClass: ErrorHandlerService,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: PrefixInterceptor, 
      multi: true, 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true, 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true, 
    },
  ],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
		throwIfAlreadyLoaded(parentModule);
    registerLocaleData(localeEs, 'es-AR');
    moment.locale('es');
	}
}