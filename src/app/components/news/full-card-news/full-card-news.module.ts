import { FullCardNewsComponent } from './full-card-news.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FullCardNewsComponent],
  imports: [CommonModule, IonicModule],
  exports: [FullCardNewsComponent],
  providers: [],
})
export class MyFullCardNews {}
