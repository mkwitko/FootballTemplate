import { NewsDetailsComponent } from './news-details.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NewsDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NewsDetailsComponent],
  providers: [],
})
export class MyNewsDetailsModule {}
