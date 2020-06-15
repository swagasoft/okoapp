import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesectionPage } from './gamesection.page';

const routes: Routes = [
  {
    path: '',
    component: GamesectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesectionPageRoutingModule {}
