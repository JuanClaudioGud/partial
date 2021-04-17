import { ModuleWithProviders, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_CONFIGURATION } from '@app/configs';
import { AuthGuard } from '@app/shared/guards';
import { AcpModule } from './acp';

const APP_ROUTES: Routes = [
  {
    path: 'acp',
    loadChildren: (): Promise<AcpModule> => (
      import('./acp').then(m => m.AcpModule)
    ),
    canActivate: [
      AuthGuard,
    ],
  },
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = (
	RouterModule.forRoot(APP_ROUTES, ROUTER_CONFIGURATION)
);