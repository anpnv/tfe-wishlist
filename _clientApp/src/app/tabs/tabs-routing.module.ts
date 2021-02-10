import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((home) => home.HomePageModule),
      },

      {
        path: 'discovery',
        loadChildren: () =>
          import('../pages/discovery/discovery.module').then((discovery) => discovery.DiscoveryPageModule),
      },
      {
        path: 'listes',
        loadChildren: () =>
          import('../pages/listes/listes.module').then((listes) => listes.ListesPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then((profile) => profile.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
