import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvPage } from './conv.page';

const routes: Routes = [
  {
    path: '',
    component: ConvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvPageRoutingModule {}
