import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WallpaperPageRoutingModule } from './wallpaper-routing.module';

import { WallpaperPage } from './wallpaper.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WallpaperPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [WallpaperPage],
})
export class WallpaperPageModule {}
