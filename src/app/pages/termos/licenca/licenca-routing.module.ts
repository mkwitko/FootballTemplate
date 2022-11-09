import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicencaPage } from './licenca.page';

const routes: Routes = [
  {
    path: '',
    component: LicencaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicencaPageRoutingModule {}
