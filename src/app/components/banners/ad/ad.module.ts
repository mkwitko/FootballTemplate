import { MySkeletonBanner } from './../../skeleton/skeleton-banner/skeleton-banner.module';
import { AdComponent } from './ad.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdComponent],
  imports: [CommonModule, IonicModule, MySkeletonBanner],
  exports: [AdComponent],
  providers: [],
})
export class MyAdModule {}
