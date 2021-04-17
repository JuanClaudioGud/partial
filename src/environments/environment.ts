// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Environment } from './interfaces';

export const environment: Environment = {
  production: false,
  pusher: {
    key: '',
    cluster: '',
  },
  api: {
    url: 'http://localhost/api/v1',
    endpoints: {
      mail: '/mail',
      login: '/auth/login',
      notifications: '/notifications',
      activities: '/activities',
      appointments: '/appointments',
      treatments: '/treatments',
      treatmentCategories: '/treatment-categories',
      workingDays: '/working-days',
      breakTimes: '/break-times',
      unavailabilities: '/unavailabilities',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.