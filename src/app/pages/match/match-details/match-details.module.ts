import { MyCustomTab } from './../../../components/tabs/tab/tab.module';
import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchDetailsPageRoutingModule } from './match-details-routing.module';

import { MatchDetailsPage } from './match-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchDetailsPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [MatchDetailsPage],
})
export class MatchDetailsPageModule {}
