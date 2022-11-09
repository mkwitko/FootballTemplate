import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPageRoutingModule } from './playlist-routing.module';

import { PlaylistPage } from './playlist.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [PlaylistPage],
})
export class PlaylistPageModule {}
