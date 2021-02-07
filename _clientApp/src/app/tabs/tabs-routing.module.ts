import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then(
            (home) => home.HomePageModule
          ),
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('../pages/profil/profil.module').then(
            (profil) => profil.ProfilPageModule
          ),
      },
      {
        path: 'lists',
        loadChildren: () =>
          import('../pages/lists/lists.module').then(
            (list) => list.ListsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/home/home',
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
export class TabsPageRoutingModule {}
