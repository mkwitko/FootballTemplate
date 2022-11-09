import { MySkeletonBanner } from './../../../components/skeleton/skeleton-banner/skeleton-banner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyAdModule } from 'src/app/components/banners/ad/ad.module';
import { MyCardNews } from 'src/app/components/news/card-news/card-news.module';
import { MyCardGame } from 'src/app/components/football/card-game/card-game.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MyCustomHeader,
    MyCardGame,
    MyCustomTab,
    MyAdModule,
    MyCardNews,
    MySkeletonBanner,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
