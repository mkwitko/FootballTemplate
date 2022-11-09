import { MyCustomHeader } from './../../../components/header/header/header.module';
import { MyTopInfo } from './../../../components/football/table/top-info/top-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabelaPageRoutingModule } from './tabela-routing.module';

import { TabelaPage } from './tabela.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabelaPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyTopInfo,
  ],
  declarations: [TabelaPage],
})
export class TabelaPageModule {}
