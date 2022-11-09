import { MyCustomTab } from './../../../components/tabs/tab/tab.module';
import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubePageRoutingModule } from './clube-routing.module';

import { ClubePage } from './clube.page';
import { MyAdModule } from 'src/app/components/banners/ad/ad.module';
import { MyClubCardModule } from 'src/app/components/club/club-card/club-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyAdModule,
    MyClubCardModule,
  ],
  declarations: [ClubePage],
})
export class ClubePageModule {}
