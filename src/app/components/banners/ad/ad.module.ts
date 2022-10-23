import { AdComponent } from './ad.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AdComponent
  ],
  providers: []
})

export class MyAdModule {}
