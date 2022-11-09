import { MyCardGame } from './../../../components/football/card-game/card-game.module';
import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyCardGame,
  ],
  declarations: [CalendarioPage],
})
export class CalendarioPageModule {}
