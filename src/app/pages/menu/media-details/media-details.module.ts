import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaDetailsPageRoutingModule } from './media-details-routing.module';

import { MediaDetailsPage } from './media-details.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaDetailsPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [MediaDetailsPage],
})
export class MediaDetailsPageModule {}
