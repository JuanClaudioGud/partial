import { environment as env } from '@env/environment';
import { ApiEndpoints } from '@env/interfaces';

const endpoints: ApiEndpoints = env.api.endpoints;

type Key = keyof typeof endpoints;

export type ApiEndpoint = typeof endpoints[Key];