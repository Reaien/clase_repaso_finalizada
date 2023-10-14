import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditZooPage } from './edit-zoo.page';

const routes: Routes = [
  {
    path: '',
    component: EditZooPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditZooPageRoutingModule {}
