import { ApiEndpoints } from './api-endpoints.interface';

export interface Environment {
  production: boolean,
  pusher: {
    key: string,
    cluster: string,
  },
  api: {
    url: string,
    endpoints: Readonly<ApiEndpoints>,
  },
}