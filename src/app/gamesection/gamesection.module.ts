import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesectionPageRoutingModule } from './gamesection-routing.module';

import { GamesectionPage } from './gamesection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesectionPageRoutingModule
  ],
  declarations: [GamesectionPage]
})
export class GamesectionPageModule {}
