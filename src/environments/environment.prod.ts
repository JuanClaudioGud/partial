import { Environment } from './interfaces';

export const environment: Environment = {
  production: true,
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