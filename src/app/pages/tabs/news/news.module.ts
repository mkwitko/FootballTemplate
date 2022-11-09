import { MySkeletonBanner } from './../../../components/skeleton/skeleton-banner/skeleton-banner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyFullCardNews } from 'src/app/components/news/full-card-news/full-card-news.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyFullCardNews,
    MySkeletonBanner,
  ],
  declarations: [NewsPage],
})
export class NewsPageModule {}
