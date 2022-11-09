import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteiraSocioPageRoutingModule } from './carteira-socio-routing.module';

import { CarteiraSocioPage } from './carteira-socio.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteiraSocioPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [CarteiraSocioPage],
})
export class CarteiraSocioPageModule {}
