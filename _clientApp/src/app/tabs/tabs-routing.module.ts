import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/home/home.module').then((home) => home.HomePageModule),
        
      },

      {
        path: 'discovery',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/discovery/discovery.module').then((discovery) => discovery.DiscoveryPageModule),
          
      },
      {
        path: 'listes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/listes/listes.module').then((listes) => listes.ListesPageModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/profile/profile.module').then((profile) => profile.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
