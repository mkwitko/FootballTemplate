import { MyClubCardModule } from './../../../components/club/club-card/club-card.module';
import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvPageRoutingModule } from './conv-routing.module';

import { ConvPage } from './conv.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyAdModule } from 'src/app/components/banners/ad/ad.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyAdModule,
    MyClubCardModule,
  ],
  declarations: [ConvPage],
})
export class ConvPageModule {}
