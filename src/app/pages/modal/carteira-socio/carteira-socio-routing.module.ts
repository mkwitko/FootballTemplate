import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteiraSocioPage } from './carteira-socio.page';

const routes: Routes = [
  {
    path: '',
    component: CarteiraSocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteiraSocioPageRoutingModule {}
