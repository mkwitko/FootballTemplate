import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicencaPageRoutingModule } from './licenca-routing.module';

import { LicencaPage } from './licenca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicencaPageRoutingModule,
    MyCustomHeader,
  ],
  declarations: [LicencaPage],
})
export class LicencaPageModule {}
