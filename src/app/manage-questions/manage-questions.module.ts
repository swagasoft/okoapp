import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageQuestionsPage } from './manage-questions.page';

const routes: Routes = [
  {
    path: '',
    component: ManageQuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageQuestionsPage]
})
export class ManageQuestionsPageModule {}
