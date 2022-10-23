import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNewsComponent } from './card-news.component';

@NgModule({
  declarations: [
    CardNewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardNewsComponent
  ],
  providers: []
})

export class MyCardNews {}
