import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemorialPage } from './memorial.page';

const routes: Routes = [
  {
    path: '',
    component: MemorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemorialPageRoutingModule {}
